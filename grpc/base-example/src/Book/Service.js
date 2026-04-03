export class BookService {
    constructor(bookDatasource) {
      this.bookDatasource = bookDatasource;
    }

    // Centraliza a regra da aplicação antes de acessar a persistência.
    createBook(bookData) {
      return this.bookDatasource.createBook(bookData);
    }

    readBook(id) {
      return this.bookDatasource.readBook(id);
    }

    readBooks() {
      return this.bookDatasource.readBooks();
    }
  }
