const books = [];

export class BookDatasource {
  // Cria um livro com ID incremental e armazena em memória.
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

  // Retorna no formato esperado pelo contrato BooksList.
  readBooks() {
    return { books: books };
  }
}
