import { Alert } from "react-native";
import { setBooks } from "./bookSlice";

export const getBooks = async () => {
  try {
    const response = await fetch("https://example.com/api/books");
    const books: Book[] = await response.json();
    setBooks(books);
  } catch (e) {
    Alert.alert("Fetch books failed with error: ", e);
  }
};
export const getBookDetail = async (id: string): Promise<BookDetail> => {
  try {
    const response = await fetch(`https://example.com/api/bookDetail?id=${id}`);
    const book: BookDetail = await response.json();
    return book;
  } catch (e) {
    throw e;
  }
};
