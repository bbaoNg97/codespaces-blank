import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BOOK_INITIAL_STATE: book.State = {
  isLoading: false,
  books: [],
  selectedBook: undefined,
  selectedBookId: "",
};

const bookSlice = createSlice({
  name: "books",
  initialState: BOOK_INITIAL_STATE,
  reducers: {
    getBooks: (state: book.State) => {
      state.isLoading = true;
    },
    getBooksDone: (state: book.State, action: PayloadAction<book.Book[]>) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    getBooksError: (state: book.State) => {
      state.isLoading = false;
    },

    getBookDetail: (state: book.State, action: PayloadAction<book.State>) => {
      state.isLoading = true;
    },
    getBookDetailDone: (
      state: book.State,
      action: PayloadAction<book.State>
    ) => {
      state.isLoading = false;
      state.selectedBook = action.payload;
    },
    getBookDetailError: (state: book.State) => {
      state.isLoading = false;
    },
    selectBook(state: book.State, action: PayloadAction<book.State>) {
      state.selectedBookId = action.payload;
    },
    updateFavourite(state, action) {
      const book = state.find((books) => books.id === action.payload.id);
      if (book) {
        book.isFavourited = action.payload.favourite;
      }
    },
  },
});

export const {
  getBooks,
  getBooksDone,
  getBooksError,
  getBookDetail,
  getBookDetailDone,
  getBookDetailError,
  updateFavourite,
  selectBook,
} = bookSlice.actions;

export default bookSlice.reducer;
