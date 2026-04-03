/**
 * Resolver do domínio Livro.
 */
export function createBookResolver({ bookService, authorService }) {
  return {
    Query: {
      books: async () => {
        return bookService.listBooks();
      },
    },
    Mutation: {
      addBook: async (_, { input }) => {
        return bookService.addBook(input);
      },
    },
    Book: {
      /**
       * Resolver de relacionamento que busca o Autor associado ao LIvro.
       * Utiliza o authorId do livro para carregar o autor no serviço.
       */
      author: async (book) => {
        const author = await authorService.getAuthorById(book.authorId);
        if (!author) {
          throw new Error("Autor não encontrado para este livro");
        }
        return author;
      },
    },
  };
}