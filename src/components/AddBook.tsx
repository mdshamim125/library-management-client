import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "../redux/api/libraryApi";
import type { IBook } from "../interface/IBook";
import Swal from "sweetalert2";
import { MdAddBox } from "react-icons/md";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IBook>({
    defaultValues: {
      available: true,
      copies: 1,
    },
  });

  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: IBook) => {
    try {
      await addBook(data).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Book Created!",
        text: "The new book has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/books");
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create book. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl text-blue-600 flex gap-2 items-center justify-center font-bold mb-4 text-center dark:text-white">
        <MdAddBox className="text-4xl" />  Add New Book
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter book title"
            {...register("title", { required: "Title is required" })}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
              errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby="title-error"
          />
          {errors.title && (
            <p
              id="title-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Author */}
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            {...register("author", { required: "Author is required" })}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
              errors.author ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={errors.author ? "true" : "false"}
            aria-describedby="author-error"
          />
          {errors.author && (
            <p
              id="author-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.author.message}
            </p>
          )}
        </div>

        {/* Genre */}
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            id="genre"
            {...register("genre", { required: "Genre is required" })}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
              errors.genre ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            defaultValue=""
            aria-invalid={errors.genre ? "true" : "false"}
            aria-describedby="genre-error"
          >
            <option value="" disabled>
              Select a genre
            </option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
          {errors.genre && (
            <p
              id="genre-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.genre.message}
            </p>
          )}
        </div>

        {/* ISBN */}
        <div className="mb-6">
          <label
            htmlFor="isbn"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            id="isbn"
            type="text"
            placeholder="Enter ISBN (numbers and dashes only)"
            {...register("isbn", {
              required: "ISBN is required",
              pattern: {
                value: /^[0-9-]+$/,
                message: "ISBN should contain only numbers and dashes",
              },
            })}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
              errors.isbn ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={errors.isbn ? "true" : "false"}
            aria-describedby="isbn-error"
          />
          {errors.isbn && (
            <p
              id="isbn-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.isbn.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Optional description about the book"
            {...register("description")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Copies */}
        <div className="mb-6">
          <label
            htmlFor="copies"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Copies <span className="text-red-500">*</span>
          </label>
          <input
            id="copies"
            type="number"
            min={1}
            placeholder="Number of copies available"
            {...register("copies", {
              required: "Copies are required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "At least one copy is required",
              },
            })}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
              errors.copies ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={errors.copies ? "true" : "false"}
            aria-describedby="copies-error"
          />
          {errors.copies && (
            <p
              id="copies-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.copies.message}
            </p>
          )}
        </div>

        {/* Available */}
        <div className="mb-8 flex items-center gap-3">
          <input
            id="available"
            type="checkbox"
            {...register("available")}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="available"
            className="font-semibold text-gray-700 dark:text-gray-300 select-none"
          >
            Available (default: checked)
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-md transition focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700"
        >
          {isSubmitting ? "Saving..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
