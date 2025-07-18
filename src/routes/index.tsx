import { createBrowserRouter } from "react-router";
import AddBook from "../components/AddBook";
import BorrowSummary from "../pages/BorrowSummary";
import MainLayouts from "../layouts/MainLayouts";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
      element: <Home/>
      },
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
