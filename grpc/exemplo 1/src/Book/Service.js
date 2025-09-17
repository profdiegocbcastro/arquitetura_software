export class BookService {
    constructor(bookDatasource) {
      this.bookDatasource = bookDatasource;
    }

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