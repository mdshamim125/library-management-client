import type { IBook } from "./IBook";

export interface IBorrowSummary {
  book: IBook;
  totalQuantity: number;
}
