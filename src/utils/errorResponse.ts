class ErrorResponse extends Error {
  constructor(message: string, private readonly statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
