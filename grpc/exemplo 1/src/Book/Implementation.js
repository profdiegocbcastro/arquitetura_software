export function getBookServiceImplementation(bookService) {
    return {
      createBook: (call, callback) => {
        callback(null, bookService.createBook(call.request.book));
      },
      readBook: (call, callback) => {
        callback(null, bookService.readBook(call.request.id));
      },
      readBooks: (call, callback) => {
        callback(null, bookService.readBooks());
      },
  };
}