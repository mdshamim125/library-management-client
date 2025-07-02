import type { IBorrowSummary } from "../interface/IBorrowSummary";
import { useGetBorrowSummaryQuery } from "../redux/api/libraryApi";



const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading summary...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Failed to load summary.</p>;
  }

  const summaryList = data?.data || [];
  console.log(summaryList);

return (
    <div className="px-4 py-6 sm:px-8 lg:px-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">📊 Borrow Summary</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of all borrowed books with total quantities.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">Loading summary...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">Failed to load borrow summary.</div>
      ) : summaryList.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No borrow records found.</div>
      ) : (
        <div className="overflow-x-auto rounded shadow border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Book Title</th>
                <th className="px-6 py-3 text-left font-medium">ISBN</th>
                <th className="px-6 py-3 text-left font-medium">Total Borrowed</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
              {summaryList.map((item: IBorrowSummary) => (
                <tr key={item.book.isbn} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-6 py-4">{item.book.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.book.isbn}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
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
