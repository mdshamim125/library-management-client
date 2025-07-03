import { useNavigate } from "react-router";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../redux/api/libraryApi";
import Swal from "sweetalert2";
import { EditBookModal } from "../modals/EditBookModal";
import { useState } from "react";
import { BorrowBookModal } from "../modals/BorrowBookModal";
import type { IBook } from "../interface/IBook";
import { FaBook, FaEdit } from 'react-icons/fa';
import { MdAddBox, MdDelete } from "react-icons/md";
import { RiTakeawayFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import Loader from "./Loader";

function BookList() {
  const { data: books, isLoading } = useGetAllBooksQuery(undefined);

  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const openEditModal = (book: IBook) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBook(null);
    setIsEditModalOpen(false);
  };

  const openBorrowModal = (book: IBook) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
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
    }
  };

  if (isLoading)
    return <Loader/>

  const bookList = books?.data || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-white mb-4 sm:mb-0 flex items-center justify-center gap-2">
          <FaBook />Book List
        </h2>
        <button
          onClick={() => navigate("/create-book")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition flex items-center gap-1 text-lg"
        >
          <MdAddBox className="text-2xl" /> Add New Book
        </button>
      </div>

      {bookList.length === 0 ? (
        <div className="text-center text-gray-500">No books available.</div>
      ) : (
        <div className="overflow-x-auto rounded shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-center">Title</th>
                <th className="px-4 py-3 text-center">Author</th>
                <th className="px-4 py-3 text-center">Genre</th>
                <th className="px-4 py-3 text-center">ISBN</th>
                <th className="px-4 py-3 text-center">Copies</th>
                <th className="px-4 py-3 text-center">Available</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm">
              {bookList.map((book: IBook) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">{book.title}</td>
                  <td className="px-4 py-3 text-center">{book.author}</td>
                  <td className="px-4 py-3 text-center">{book.genre}</td>
                  <td className="px-4 py-3 text-center">{book.isbn}</td>
                  <td className="px-4 py-3 text-center">{book.copies}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-medium ${
                        book.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {book.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditModal(book)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    >
                      <FaEdit title="edit" className="text-lg" />
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      <MdDelete title="delete" className="text-lg" />
                    </button>
                    <button
                      onClick={() => openBorrowModal(book)}
                      className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    >
                      <RiTakeawayFill title="borrow" className="text-lg"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isEditModalOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={closeEditModal}
          onSaved={() => {
            closeEditModal();
            // refetch if you have a refetch function or update your UI accordingly
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

export default BookList;
