import React, { useEffect } from 'react'
import BookGrid from './components/BookGrid'
import { useBooks } from '../../context/BookContext'
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl'

const Shop = () => {
  const {books, loading, error, fetchBooks,} = useBooks()
// console.log(books)

  useEffect(()=> {
    fetchBooks()
  },[fetchBooks])

  const hanDeleteBook = async(id) => {
    try {
      await axios.delete(`${baseUrl}/books/${id}`)
      alert('Book deleted successfully')
      fetchBooks()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='container mx-auto px-4 py-12 min-h-screen'>
    

    <div className='py-8 md:px-4'>
        <BookGrid books={books} loading={loading} error={error} onDeletedBook={hanDeleteBook}/>
    </div>
    
    </div>
  )
}

export default Shop