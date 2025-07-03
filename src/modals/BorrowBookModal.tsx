import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useCreateBorrowMutation } from "../redux/api/libraryApi"; // adjust path
import type { IBook } from "../interface/IBook";

interface BorrowBookModalProps {
  book: IBook;
  onClose: () => void;
}

export const BorrowBookModal: React.FC<BorrowBookModalProps> = ({
  book,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [createBorrow] = useCreateBorrowMutation(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity > book.copies) {
      Swal.fire({
        icon: "error",
        title: "Invalid quantity",
        text: `Only ${book.copies} copies available.`,
      });
      return;
    }

    try {
      await createBorrow({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Book borrowed!",
        text: "Your borrow request has been submitted.",
        timer: 1000,
        showConfirmButton: false,
      });

      onClose();
      navigate("/borrow-summary"); 
    } catch {
      Swal.fire({
        icon: "error",
        title: "Borrow failed",
        text: "Something went wrong while borrowing the book.",
      });
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block max-h-[90vh] overflow-y-auto px-4 pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
          <h3
            className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
            id="modal-title"
          >
            Borrow "{book.title}"
          </h3>

          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Quantity */}
            <label
              htmlFor="quantity"
              className="block text-sm text-gray-700 dark:text-gray-200"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
              required
            />

            {/* Due Date */}
            <label
              htmlFor="dueDate"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              min={minDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
              required
            />

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              >
                Borrow
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
