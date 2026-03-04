/**
 * Resolver do domínio Autor.
 */
export function createAuthorResolver({ authorService, bookService }) {
  return {
    Query: {
      authors: async () => {
        return authorService.listAuthors();
      },
    },
    Mutation: {
      addAuthor: async (_, { input }) => {
        return authorService.addAuthor(input);
      },
    },
    Author: {
      /**
       * Resolver de relacionamento que busca os Livros associados ao Autor.
       * Utiliza o id do autor para carregar os livros no serviço.
       */
      books: async (author) => {
        return bookService.listBooksByAuthor(author.id);
      },
    },
  };
}