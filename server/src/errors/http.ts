export class BadRequestError extends Error {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends Error {
  readonly statusCode = 403;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class TooManyRequestsError extends Error {
  readonly statusCode = 429;

  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequestsError';
  }
}

export class ConflictError extends Error {
  readonly statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnprocessableEntityError extends Error {
  readonly statusCode = 422;

  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}

export class InternalServerError extends Error {
  readonly statusCode = 500;

  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
  }
}

export type HttpError =
  | BadRequestError
  | ForbiddenError
  | NotFoundError
  | TooManyRequestsError
  | ConflictError
  | UnprocessableEntityError
  | InternalServerError;

export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof BadRequestError ||
  error instanceof ForbiddenError ||
  error instanceof NotFoundError ||
  error instanceof TooManyRequestsError ||
  error instanceof ConflictError ||
  error instanceof UnprocessableEntityError ||
  error instanceof InternalServerError;
