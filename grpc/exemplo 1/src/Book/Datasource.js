const books = [];

export class BookDatasource {
  createBook(bookData) {
    const bookObject = {
      id: books.length + 1,
      book: bookData,
    };
    books.push(bookObject);
    return bookObject;
  }

  readBook(id) {
    return books.find((book) => book.id === id);
  }

  readBooks() {
    return { books: books };
  }
}