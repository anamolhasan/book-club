import React, { useEffect } from "react";
import BookGrid from "./components/BookGrid";
import { useBooks } from "../../context/BookContext";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import CategoryNav from "./components/CategoryNav";
import SortBooks from "./components/SortBooks";
import Pagination from "./components/Pagination";

const Shop = () => {
  const {
    books,
    loading,
    error,
    fetchBooks,

    filters,
    pagination,

    updateFilters,
  } = useBooks();
  // console.log(books)

  const categories = [
    "All Collection",
    "Fiction",
    "Adventure",
    "Romance",
    "Dystopian",
    "Historical",
    "Non-Fiction",
  ];

  useEffect(() => {
    fetchBooks();
  }, [filters, fetchBooks]);

  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === "All Collection" ? "" : category,
      page: 1,
    });
  };

  const handleSortChange = (sortConfig) => {
    updateFilters({
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hanDeleteBook = async (id) => {
    try {
      await axios.delete(`${baseUrl}/books/${id}`);
      alert("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center flex-wrap border-b border-gray-200 pb-4">
        <CategoryNav
          categories={categories}
          activeCategory={filters.genre || "All Collections"}
          onCategoryChange={handleCategoryChange}
        />

        {/* Add sorting controls */}
        <div className="p-4 flex justify-end font-bold">
          <SortBooks
            currentSort={{
              sortBy: filters.sortBy,
              order: filters.order,
            }}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      {/* result summery */}
      <div className="py-4 text-gray-600 px-4">
        Showing{" "}
        {pagination.totalBooks > 0
          ? (pagination.currentPage - 1) * filters.limit + 1
          : 0}{" "}
        -{" "}
        <span>
          {Math.min(
            pagination.currentPage * filters.limit,
            pagination.totalBooks
          )}{" "}
          of {pagination.totalBooks} books
        </span>
      </div>

      {/* book card */}
      <div className="py-8 md:px-4">
        <BookGrid
          books={books}
          loading={loading}
          error={error}
          onDeletedBook={hanDeleteBook}
        />
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Shop;
