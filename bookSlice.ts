import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BOOKS_INITIAL_STATE: Book[] = [];

const bookSlice = createSlice({
  name: 'books',
  initialState: BOOKS_INITIAL_STATE,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state = action.payload;
    }
  }
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
