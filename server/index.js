const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect mongodb

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // connect to mongodb
    const db = client.db("book-management-system");
    const booksCollection = db.collection("books");

    app.post("/books", async (req, res) => {
      const bookData = req.body;
      try {
        const book = await booksCollection.insertOne(bookData);
        res.status(201).json({ message: "Book Insterted successfully!", book });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // get all books (GET)
    app.get("/books", async (req, res) => {
      const {
        page,
        limit,
        genre,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        author,
        sortBy,
        order,
        search,
      } = req.query;
      try {

        const currentPage = Math.max(1, parseInt(page) || 1)
        const perPage = parseInt(limit) || 10
        const skip = (currentPage - 1) * perPage


        const filter = {}

        if(search){
          filter.$or = [
            {title: {$regex: search, $options: 'i'}},
            {description: {$regex: search, $options: 'i'}}
          ]
        }

        if(genre) filter.genre = genre

        if(minYear || maxYear) {
          filter.publishedYear = {
            ...(minYear && {$gte: parseInt(minYear)}),
            ...(maxYear && {$lte: parseInt(maxYear)})
          }
        }

        if(author) filter.author = author

        if(minPrice || maxPrice) {
          filter.price={
            ...(minPrice && {$gte: parseFloat(minPrice)}),
            ...(maxPrice && {$lte: parseFloat(maxPrice)})
          }
        }

        const sortOptions = { [sortBy || 'title']: order === 'desc' ? -1 : 1}

        const [books, totalBooks] = await Promise.all([booksCollection.find(filter).sort(sortOptions).skip(skip).limit(perPage).toArray(), booksCollection.countDocuments(filter)])



        // const books = await booksCollection.find().toArray();
        res.status(201).json({ books, totalBooks, currentPage, totalPages: Math.ceil(totalBooks / perPage) });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });


    app.get('/books/:id', async(req, res) => {
      const bookId = req.params.id

      try {
        const book = await booksCollection.findOne({_id: new ObjectId(bookId)})
        if(!book) return res.status(404).json({message: 'Book not found!'})
          res.json(book)
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to Book Management API!");
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});

// admin
// 5CUbTmF3tRBu2DfF
