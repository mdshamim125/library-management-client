import type { IBook } from "./IBook";

export interface IModalSlice {
  isEditModalOpen: boolean;
  isBorrowModalOpen: boolean;
  selectedBook: IBook | null;
}