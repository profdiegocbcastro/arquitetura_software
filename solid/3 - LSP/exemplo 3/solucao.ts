class Logger {
  log(message: string): void {
    console.log(`LOG: ${message}`);
  }
}

class LimitedLogger extends Logger {
  private maxLength: number;

  constructor(maxLength: number) {
    super();
    this.maxLength = maxLength;
  }

  log(message: string): void {
    const truncatedMessage =
      message.length > this.maxLength
        ? message.slice(0, this.maxLength) + "..." // Trunca a mensagem
        : message;
    super.log(truncatedMessage);
  }
}
