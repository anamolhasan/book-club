import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useBooks } from '../../context/BookContext'
import { useForm, SubmitHandler } from "react-hook-form"

const EditBook = () => {
  const {id} = useParams()

  const {currentBook, fetchBookDetails, updateBook} = useBooks()
  const {register, handleSubmit, setValue} = useForm()

  useEffect(()=>{
    fetchBookDetails(id)
  },[id, fetchBookDetails])

  useEffect(()=>{
    if(currentBook){
      
    }
  },[])
  return (
    <div>EditBook</div>
  )
}

export default EditBook