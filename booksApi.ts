export const getBookDetail = async (id: string): Promise<book.Book> => {
  try {
    const response = await fetch(`https://example.com/api/bookDetail?id=${id}`);
    const bookResponse: book.Book = await response.json();
    return bookResponse;
  } catch (e) {
    throw e;
  }
};
