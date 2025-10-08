import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios'

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    page:1,
    limit:8,
    genre:'',
    minYear:'',
    maxYear:'',
    author:'',
    minPrice:'',
    maxPrice:'',
    sortBy:'title',
    order:'asc',
    search:''
  })

  const [pagination, setPagination] = useState({
    totalBooks:0,
    currentPage:1,
    totalPages:1
  })


  const fetchBooks = useCallback(async()=> {
    try {
        setLoading(true)
        setError(null)

         // Build query parameters exactly matching server expectations
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([Key, value]) => {
            if(value !== ''){
                params.append(Key, value)
            }
        })

        const response = await axios.get(`http://localhost:3000/books?${params}`)
        setBooks(response.data.books)
        setPagination({
            currentPage: response.data.currentPage,
            totalBooks: response.data.totalBooks,
            totalPages: response.data.totalPages
        })
        // console.log(response)
    } catch (error) {
        setError(error.message)
    } finally{
        setLoading(false)
    }
  },[filters])




  const fetchBookDetails = useCallback(async(bookId) => {
    try {
        setLoading(true)
        setError(null)

        const response = await axios.get(`http://localhost:3000/books/${bookId}`)
        setCurrentBook(response.data)
        return response.data
    } catch (error) {
        setError(error.message)
        throw error
    } finally {
        setLoading(false)
    }
  },[])

    const clearCurrentBook = useCallback(()=>{
     setCurrentBook(null)
  },[])


    const updateFilters = useCallback(async(newFilters)=>{
     setFilters(prev => ({
        ...prev,
        ...newFilters,
        page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
     }))
  },[])

  useEffect(()=>{
    fetchBooks()
  },[filters])


  const value = {
    books,
    currentBook,
    loading,
    error,
    filters,
    pagination,
    fetchBooks,
    clearCurrentBook,
    updateFilters,
    fetchBookDetails
  };
  return <BookContext.Provider value={value}>
                 {children}
        </BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be withing a Book Provide");
  }

  return context;
};
