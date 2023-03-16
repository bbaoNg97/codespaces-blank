declare namespace book {
  interface State {
    isLoading: boolean;
    books: Book[];
    selectedBookId?: string;
    selectedBook?: Book;
  }

  interface Book {
    id: string;
    title: string;
    isFavourited: boolean;
    coverImage: string;
    author: string;
    publishedDate: string;
    publisher: string;
    pages: string;
    description: string;
  }
}
