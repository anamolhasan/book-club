import React from 'react'


const SortBooks = ({currentSort, onSortChange}) => {
    const sortOptions = [
      {label: 'Default', value: {sortBy: 'title', order: 'asc'}},
      {label: 'Price: Low to Hight', value: {sortBy: 'price', order:'asc'}},
      {label: 'Price: High to Low', value: {sortBy: 'Price', order: 'desc'}},
      {label: 'Date: Newest', value: {sortBy: 'publishedYear', order: 'desc'}},
      {label: 'Date: Oldest', value: {sortBy: 'publishedYear', order: 'asc'}}
    ]


  return (
    <div className='flex items-center space-x-2'>
      <label htmlFor="sort" className='text-sm text-gray-600'>Sort by:</label>
      <select name="" id="sort" className='border rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:right-amber-500' 
      value={`${currentSort.sortBy} - ${currentSort.order}`}
      onChange={(e) => {
        const [sortBy, order] = e.target.value.split('-')
        onSortChange({sortBy, order})
      }}
      >
        {
          sortOptions.map((option) => (
            <option key={`${option.value.sortBy}-${option.value.order}`} value={`${option.value.sortBy}-${option.value.order}`}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}
export default SortBooks


// import { useBooks } from '../../context/BookContext';

// const BookSort = () => {
//   const { filters, updateFilters, fetchBooks } = useBooks();

//   const handleSort = (e) => {
//     updateFilters({ sortBy: e.target.value });
//     fetchBooks();
//   };
//   return (
//     <select value={filters.sortBy} onChange={handleSort}>
//         <option value="title"> Title</option>
//         <option value="price"> Price</option>
//         <option value="publishedYear"> Year</option>
//     </select>
//   )
// }
