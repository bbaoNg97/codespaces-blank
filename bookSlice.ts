import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BOOKS_INITIAL_STATE: Book[] = [];

const bookSlice = createSlice({
  name: "books",
  initialState: BOOKS_INITIAL_STATE,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state = action.payload;
    },
    updateFavourite(state, action) {
      const book = state.find((books) => books.id === action.payload.id);
      if (book) {
        book.isFavourited = action.payload.favourite;
      }
    },
  },
});

export const { setBooks, updateFavourite } = bookSlice.actions;

export default bookSlice.reducer;
