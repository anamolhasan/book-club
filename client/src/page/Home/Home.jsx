import React from 'react'
import { useBooks } from '../../context/BookContext'
import Hero from './components/Hero'
import Shop from '../shop/Shop'

const Home = () => {
  const {books, currentBooks, loading, error} = useBooks()
  // console.log(books)
  return (
    <>
      <Hero />
      <Shop />
    </>
  )
}

export default Home