export abstract class CustomError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract statusCode: Number;

  abstract serializeError(): { message: string; filed?: string }[];
}
