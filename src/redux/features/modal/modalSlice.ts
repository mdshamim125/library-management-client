import { createSlice } from "@reduxjs/toolkit";
import type { IModalSlice } from "../../../interface/IModalSlice";



const initialState: IModalSlice = {
  isEditModalOpen: false,
  isBorrowModalOpen: false,
  selectedBook: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedBook = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedBook = null;
    },
    openBorrowModal: (state, action) => {
      state.isBorrowModalOpen = true;
      state.selectedBook = action.payload;
    },
    closeBorrowModal: (state) => {
      state.isBorrowModalOpen = false;
      state.selectedBook = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openEditModal, closeEditModal, openBorrowModal, closeBorrowModal } =
  modalSlice.actions;

export default modalSlice.reducer;
