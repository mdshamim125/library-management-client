import React, { useState } from "react";
import { useUpdateBookMutation } from "../redux/api/libraryApi";
import type { IBook } from "../interface/IBook";
import Swal from "sweetalert2";

interface EditBookModalProps {
  book: IBook;
  onClose: () => void;
  onSaved: () => void;
}

export const EditBookModal: React.FC<EditBookModalProps> = ({
  book,
  onClose,
  onSaved,
}) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState<IBook["genre"]>(book.genre);
  const [isbn] = useState(book.isbn); // assuming ISBN is not editable
  const [description, setDescription] = useState(book.description || "");
  const [copies, setCopies] = useState(book.copies);
  const [available, setAvailable] = useState(book.available);
  const [updateBook] = useUpdateBookMutation();

  //   const [publishedYear, setPublishedYear] = useState(book.publishedYear);
  // console.log(book);
  // Business logic: copies affects availability
  const handleCopiesChange = (value: number) => {
    if (value < 0) return; // prevent negative
    setCopies(value);
    setAvailable(value > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
    };

    try {
      await updateBook({ id: book?._id, ...updatedBook }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Book updated!",
        text: "The book information has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });

      onSaved(); // close modal and refresh data
    } catch (error) {
      console.error("Failed to update book:", error);

      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong while updating the book.",
      });
    }
  };

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

        <div className="relative inline-block max-h-[90vh] overflow-y-auto px-4 pt-5 pb-4 text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
          <h3
            className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
            id="modal-title"
          >
            Edit Book
          </h3>

          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Title */}
            <label
              htmlFor="title"
              className="block text-sm text-gray-700 dark:text-gray-200"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            />

            {/* Author */}
            <label
              htmlFor="author"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            />

            {/* Genre */}
            <label
              htmlFor="genre"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value as IBook["genre"])}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            >
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>

            {/* ISBN (readonly) */}
            <label
              htmlFor="isbn"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              ISBN (readonly)
            </label>
            <input
              id="isbn"
              type="text"
              value={isbn}
              readOnly
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
            />

            {/* Description */}
            <label
              htmlFor="description"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            ></textarea>

            {/* Copies */}
            <label
              htmlFor="copies"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Copies
            </label>
            <input
              id="copies"
              type="number"
              value={copies}
              min={0}
              onChange={(e) => handleCopiesChange(Number(e.target.value))}
              className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              required
            />

            {/* Availability (readonly) */}
            <label
              htmlFor="available"
              className="block mt-3 text-sm text-gray-700 dark:text-gray-200"
            >
              Available
            </label>
            <input
              id="available"
              type="text"
              value={available ? "Yes" : "No"}
              readOnly
              className="block w-full px-4 py-3 mt-1 text-sm text-green-600 bg-white border border-gray-200 rounded-md cursor-not-allowed dark:border-gray-600 dark:bg-gray-900 dark:text-green-500"
            />

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
