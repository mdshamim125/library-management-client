import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./api/libraryApi";
import { modalSlice } from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(libraryApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
