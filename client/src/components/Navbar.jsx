import React from 'react'
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <div className='flex items-center justify-center gap-7 font-bold py-4 bg-green-700 text-white'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to={'/books'}>Shop</NavLink>
      <NavLink to={'/ebooks'}>Ebooks</NavLink>
      <NavLink to={'/books/add'}>Add Book</NavLink>
    </div>
  )
}

export default Navbar