import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message?: string, statusCode: number = 500, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const throwNotFound = (field: string, value: any): never => {
  throw new AppError(`${field} with value ${value} is not found`, StatusCodes.NOT_FOUND);
};

export const throwConflict = (field: string, value: any) => {
  throw new AppError(`${field} with value ${value} already exists`, StatusCodes.CONFLICT);
};

export const throwUnAuthorized = () => {
  throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
};
