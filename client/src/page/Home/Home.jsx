import React from 'react'
import { useBooks } from '../../context/BookContext'

const Home = () => {
  const {books, currentBooks, loading, error} = useBooks()
  console.log(books)
  return (
    <div>Home</div>
  )
}

export default Home