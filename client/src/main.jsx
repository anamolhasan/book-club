// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./page/Home/Home.jsx";
import Shop from "./page/shop/Shop.jsx";
import BookDetails from "./page/singleBooks/BookDetails.jsx";
import EditBook from "./page/editBook/EditBook.jsx";
import AddBook from "./page/addBook/AddBook.jsx";
import Ebooks from "./page/ebook/Ebooks.jsx";
import Membership from "./page/membership/Membership.jsx";
import JoinCommunity from "./JoinCommunity/JoinCommunity.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <Routes>
         <Route element={<App />}>
            <Route path="/" element={<Home />}/>
            <Route path="/books" element={<Shop />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/book/add" element={<AddBook />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/join-community" element={<JoinCommunity />} />
         </Route>
     </Routes>
  </BrowserRouter>
);
