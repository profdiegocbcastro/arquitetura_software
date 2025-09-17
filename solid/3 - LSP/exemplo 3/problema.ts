class Logger {
  log(message: string): void {
    console.log(`LOG: ${message}`);
  }
}

class LogColorido extends Logger {
  log(message: string): void {
    console.log(`\x1b[36mLOG: ${message}\x1b[0m`);
  }
}

class LimitedLogger extends Logger {
  private maxLength: number;

  constructor(maxLength: number) {
    super();
    this.maxLength = maxLength;
  }

  log(message: string): void {
    if (message.length > this.maxLength) {
      throw new Error(
        `Mensagem excede o tamanho máximo permitido de ${this.maxLength} caracteres.`
      );
    }
    super.log(message);
  }
}

// Função que utiliza um Logger
function processLogs(logger: Logger): void {
  logger.log("Mensagem curta"); // Funciona normalmente
  logger.log(
    "Mensagem muito longa que deveria ser registrada, mas pode causar um problema dependendo da implementação do Logger."
  );
}

// Testando com diferentes implementações
const simpleLogger = new Logger();
const limitedLogger = new LimitedLogger(20);

processLogs(simpleLogger);
// Saída esperada:
// LOG: Mensagem curta
// LOG: Mensagem muito longa que deveria ser registrada, mas pode causar um problema dependendo da implementação do Logger.

processLogs(limitedLogger);
// Comportamento inesperado (quebra do LSP):
// LOG: Mensagem curta
// Erro: Mensagem excede o tamanho máximo permitido de 20 caracteres.
