import { createBrowserRouter } from "react-router";
import AddBook from "../components/AddBook";
import BorrowSummary from "../components/BorrowSummary";
import MainLayouts from "../layouts/MainLayouts";
import AllBooks from "../pages/AllBooks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "books",
        element: <AllBooks />,
      },
      {
        path: "create-book",
        element: <AddBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
