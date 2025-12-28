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

export const throwNOT_FOUND = (field: string) => {
  throw new AppError(`${field} is not found`, StatusCodes.NOT_FOUND);
};

export const throwCONFLICT = (field: string) => {
  throw new AppError(`${field} already exists`, StatusCodes.CONFLICT);
};

export const throwUNAUTHORIZED = () => {
  throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
};
