/**
 * Esta função devolve a implementação concreta do serviço gRPC.
 *
 * Em métodos unary do gRPC para Node.js, cada operação normalmente recebe:
 *
 * - call:
 *   representa a chamada feita pelo cliente
 *   Os dados enviados pelo cliente ficam em call.request
 *
 * - callback:
 *   função usada para devolver a resposta ao cliente
 *   O formato esperado é callback(erro, resposta)
 *
 * Papel desta camada:
 * - ler os dados recebidos via gRPC
 * - delegar a regra para a camada de service
 * - devolver a resposta final ao cliente
 */
export function getBookServiceImplementation(bookService) {
    return {
      /**
       * Implementação de:
       * rpc createBook (BookItem) returns (BookItem)
       *
       * Leitura da assinatura:
       * - o cliente envia uma única mensagem do tipo BookItem
       * - o servidor devolve uma única mensagem do tipo BookItem
       *
       * Neste caso, o valor enviado pelo cliente é lido em call.request.book.
       * Depois disso, a implementação delega a criação para a camada de service
       * e devolve o resultado final usando callback(...).
       */
      createBook: (call, callback) => {
        callback(null, bookService.createBook(call.request.book));
      },

      /**
       * Implementação de:
       * rpc readBook (BookRequest) returns (BookItem)
       *
       * Leitura da assinatura:
       * - o cliente envia uma única mensagem do tipo BookRequest
       * - o servidor devolve uma única mensagem do tipo BookItem
       *
       * Aqui o ID recebido pelo servidor fica em call.request.id.
       * A implementação usa esse valor para chamar o service
       * e devolve o livro encontrado com callback(...).
       */
      readBook: (call, callback) => {
        callback(null, bookService.readBook(call.request.id));
      },

      /**
       * Implementação de:
       * rpc readBooks (Empty) returns (BooksList)
       *
       * Leitura da assinatura:
       * - o cliente envia uma mensagem vazia
       * - o servidor devolve uma única mensagem do tipo BooksList
       *
       * Como a requisição é Empty, call.request não traz dados relevantes.
       * Por isso, a implementação apenas chama o service
       * e devolve a lista de livros com callback(...).
       */
      readBooks: (call, callback) => {
        callback(null, bookService.readBooks());
      },
  };
}
