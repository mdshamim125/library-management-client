// import { useNavigate } from "react-router";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../redux/api/libraryApi";
import Swal from "sweetalert2";
import { EditBookModal } from "../modals/EditBookModal";
import { BorrowBookModal } from "../modals/BorrowBookModal";
import type { IBook } from "../interface/IBook";
import { FaBook, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiTakeawayFill } from "react-icons/ri";
import Loader from "./Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  openEditModal,
  closeEditModal,
  openBorrowModal,
  closeBorrowModal,
} from "../redux/features/modal/modalSlice";

function BookGrid() {
  const { data: books, isLoading, refetch } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const { isEditModalOpen, selectedBook, isBorrowModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();

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
      refetch(); 
    }
  };

  if (isLoading) return <Loader />;

  const bookList = books?.data || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10 container mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl w-full text-center font-bold text-blue-600 dark:text-white mb-4 sm:mb-0 flex items-center justify-center gap-2">
          <FaBook /> Book Collections
        </h2>
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
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Author: {book.author}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Genre: {book.genre}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ISBN: {book.isbn}
              </p>
              <p className="text-sm mt-2">
                <span className="font-medium">Copies:</span> {book.copies}
              </p>
              <p className="text-sm">
                <span className="font-medium">Available:</span>{" "}
                <span
                  className={book.available ? "text-green-600" : "text-red-600"}
                >
                  {book.available ? "Yes" : "No"}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => dispatch(openEditModal(book))}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  <FaEdit title="edit" className="text-lg" />
                </button>
                <button
                  onClick={() => dispatch(openBorrowModal(book))}
                  className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  <RiTakeawayFill title="borrow" className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <MdDelete title="delete" className="text-lg" />
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
          onClose={() => dispatch(closeEditModal())}
          onSaved={() => {
            dispatch(closeEditModal());
            refetch();
          }}
        />
      )}

      {isBorrowModalOpen && selectedBook && (
        <BorrowBookModal
          book={selectedBook}
          onClose={() => dispatch(closeBorrowModal())}
        />
      )}
    </div>
  );
}

export default BookGrid;
