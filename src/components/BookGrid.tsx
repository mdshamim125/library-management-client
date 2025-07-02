// import { useNavigate } from "react-router";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../redux/api/libraryApi";
import Swal from "sweetalert2";
import { EditBookModal } from "../modals/EditBookModal";
import { useState } from "react";
import { BorrowBookModal } from "../modals/BorrowBookModal";
import type { IBook } from "../interface/IBook";

function BookGrid() {
  const { data: books, isLoading, refetch } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
//   const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const openEditModal = (book: IBook) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const openBorrowModal = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBook(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteBook(id);
      Swal.fire({
        title: "Deleted!",
        text: "Book has been deleted.",
        icon: "success",
      });
      refetch(); // Refresh after delete
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500 py-10">Loading books...</p>;

  const bookList = books?.data || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10 container mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl w-full text-center font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
          📚 Book Management
        </h2>
        {/* <button
          onClick={() => navigate("/create-book")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          ➕ Add New Book
        </button> */}
      </div>

      {bookList.length === 0 ? (
        <div className="text-center text-gray-500">No books available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookList.map((book: IBook) => (
            <div
              key={book._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-5"
            >
              <h3 className="text-lg font-bold text-blue-600">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Author: {book.author}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Genre: {book.genre}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">ISBN: {book.isbn}</p>
              <p className="text-sm mt-2">
                <span className="font-medium">Copies:</span> {book.copies}
              </p>
              <p className="text-sm">
                <span className="font-medium">Available:</span>{" "}
                <span className={book.available ? "text-green-600" : "text-red-600"}>
                  {book.available ? "Yes" : "No"}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(book)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => openBorrowModal(book)}
                  className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  🔄 Borrow
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {isEditModalOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={closeEditModal}
          onSaved={() => {
            closeEditModal();
            refetch();
          }}
        />
      )}

      {isBorrowModalOpen && selectedBook && (
        <BorrowBookModal
          book={selectedBook}
          onClose={() => setIsBorrowModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BookGrid;
