import { toGrpcError } from "../shared/toGrpcError.js";
import { ValidationError } from "../shared/applicationError.js";

/**
 * =========================================================
 * Controller gRPC da biblioteca
 * =========================================================
 *
 * Esta camada conhece o contrato gRPC.
 *
 * É aqui que fazemos:
 * - leitura de call.request
 * - validação de entrada
 * - chamada do service correto
 * - uso de callback(...)
 * - conversão de erros para o formato gRPC
 */
export function getLibraryController(authorService, bookService) {
  return {
    /**
     * Implementação de:
     * rpc ListAuthors (Empty) returns (AuthorsListResponse)
     *
     * Leitura da assinatura:
     * - o cliente envia uma única mensagem vazia
     * - o servidor devolve uma única resposta com a lista de autores
     *
     * Como não há dados de entrada para validar,
     * a controller apenas chama o service e devolve o resultado.
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
     * Aqui a controller:
     * - lê call.request.authorId
     * - valida se o ID é um inteiro positivo
     * - delega a busca para o service
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
     * Nesta operação a controller valida o nome recebido,
     * monta o objeto de entrada e chama a camada de serviço.
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
     * Como não há parâmetros de entrada, a controller
     * apenas delega a consulta para o service.
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
     * Aqui validamos call.request.bookId antes de chamar o service.
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
     * - o servidor devolve uma resposta com os livros do autor
     *
     * A controller valida o authorId recebido
     * e delega a operação para o service.
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
     * - o título do livro
     * - o ID do autor
     *
     * Depois disso, repassa o payload normalizado
     * para a camada de serviço.
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
 * Valida textos obrigatórios recebidos no request gRPC.
 *
 * Esse helper deixa a validação de entrada reutilizável
 * sem espalhar a mesma lógica por vários métodos.
 */
function readRequiredText(value, fieldLabel) {
  const normalizedValue = (value ?? "").trim();

  if (!normalizedValue) {
    throw new ValidationError(`${fieldLabel} é obrigatório.`);
  }

  return normalizedValue;
}

/**
 * Valida IDs inteiros positivos recebidos no request gRPC.
 *
 * Como IDs inválidos são um problema de entrada,
 * essa validação fica na controller.
 */
function readPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new ValidationError(`${fieldName} inválido.`);
  }

  return value;
}
