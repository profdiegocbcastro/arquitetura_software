import { toGrpcError } from "../shared/toGrpcError.js";
import { ValidationError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Controller gRPC da biblioteca
 * =========================================================
 *
 * Esta camada conhece o contrato gRPC e faz a adaptação
 * entre:
 * - o formato do request recebido
 * - os services da aplicação
 * - o callback exigido pelo gRPC
 */
export function getLibraryController(authorService, bookService) {
  return {
    /**
     * Implementação de:
     * rpc ListAuthors (Empty) returns (AuthorsListResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma mensagem vazia
     * - o servidor devolve uma resposta com todos os autores
     *
     * Como não há parâmetros, a controller apenas
     * delega a operação para o service.
     */
    async ListAuthors(_call, callback) {
      try {
        const response = await authorService.listAuthors();
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc GetAuthor (GetAuthorRequest) returns (AuthorResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia um GetAuthorRequest
     * - o servidor devolve um único AuthorResponse
     *
     * A controller lê call.request.authorId,
     * valida a entrada e então chama o service.
     */
    async GetAuthor(call, callback) {
      try {
        const authorId = readPositiveInteger(call.request.authorId, "author_id");
        const author = await authorService.getAuthor(authorId);
        callback(null, author);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc AddAuthor (AddAuthorRequest) returns (AuthorResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia um AddAuthorRequest
     * - o servidor devolve o autor criado
     *
     * Nesta operação a controller valida o nome recebido
     * antes de delegar a criação ao service.
     */
    async AddAuthor(call, callback) {
      try {
        const name = readRequiredText(call.request.name, "Nome do autor");
        const author = await authorService.addAuthor({ name });
        callback(null, author);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc ListBooks (Empty) returns (BooksListResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma mensagem vazia
     * - o servidor devolve uma resposta com a lista de livros
     *
     * Como não há dados de entrada, a controller
     * apenas chama o service correspondente.
     */
    async ListBooks(_call, callback) {
      try {
        const response = await bookService.listBooks();
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc GetBook (GetBookRequest) returns (BookResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia um GetBookRequest
     * - o servidor devolve um único BookResponse
     *
     * A controller valida o bookId recebido
     * antes de delegar a busca.
     */
    async GetBook(call, callback) {
      try {
        const bookId = readPositiveInteger(call.request.bookId, "book_id");
        const book = await bookService.getBook(bookId);
        callback(null, book);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc ListBooksByAuthor (ListBooksByAuthorRequest) returns (BooksListResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia um ListBooksByAuthorRequest
     * - o servidor devolve os livros do autor informado
     *
     * Aqui validamos o authorId e depois
     * repassamos a operação para o service.
     */
    async ListBooksByAuthor(call, callback) {
      try {
        const authorId = readPositiveInteger(call.request.authorId, "author_id");
        const response = await bookService.listBooksByAuthor(authorId);
        callback(null, response);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },

    /**
     * Implementação de:
     * rpc AddBook (AddBookRequest) returns (BookResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia um AddBookRequest
     * - o servidor devolve o livro criado
     *
     * Nesta operação a controller valida:
     * - o título
     * - o ID do autor
     *
     * Depois disso, monta o payload normalizado
     * e chama a camada de serviço.
     */
    async AddBook(call, callback) {
      try {
        const title = readRequiredText(call.request.title, "Título do livro");
        const authorId = readPositiveInteger(call.request.authorId, "author_id");
        const available = call.request.available ?? true;

        const book = await bookService.addBook({
          title,
          authorId,
          available,
        });
        callback(null, book);
      } catch (error) {
        callback(toGrpcError(error));
      }
    },
  };
}

/**
 * Valida textos obrigatórios da camada gRPC.
 *
 * Esse helper evita repetição de código
 * nas operações que recebem campos textuais.
 */
function readRequiredText(value, fieldLabel) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new ValidationError(`${fieldLabel} é obrigatório.`);
  }

  return normalizedValue;
}

/**
 * Valida IDs inteiros positivos da camada gRPC.
 *
 * Como isso é uma validação de entrada do protocolo,
 * ela fica concentrada nesta camada.
 */
function readPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError(`${fieldName} inválido.`);
  }

  return value;
}
