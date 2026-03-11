export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ApplicationError";
    this.code = code;
  }
}
