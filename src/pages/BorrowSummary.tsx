import Loader from "../components/Loader";
import type { IBorrowSummary } from "../interface/IBorrowSummary";
import { useGetBorrowSummaryQuery } from "../redux/api/libraryApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);
  const summaryList = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          📊 Borrow Summary
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Overview of all borrowed books with total quantities.
        </p>
      </div>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          Failed to load borrow summary.
        </div>
      ) : summaryList.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No borrow records found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-semibold">📖 Book Title</th>
                <th className="px-6 py-4 font-semibold">📘 ISBN</th>
                <th className="px-6 py-4 font-semibold text-right">
                  📦 Total Borrowed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {summaryList.map((item: IBorrowSummary) => (
                <tr
                  key={item.book.isbn}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-100">
                    {item.book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {item.book.isbn}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
