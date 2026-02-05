import { Request, Response, NextFunction } from "express";
import { isDev } from "../infrastructure/config.js";
import { StatusCodes } from "http-status-codes";

export const useErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  const formattedStack = err.stack ? err.stack.split("\n") : undefined;

  // Log the error (replace with your actual logger if not using console)
  /*   console.error({
    message,
    statusCode,
    url: req.originalUrl,
    isOperational: err?.isOperational,
    method: req.method,
    params: req.params,
    body: req.body,
    stack: formattedStack,
  }); */

  res
    .status(statusCode)
    .json({
      message,
      statusCode,
      isOperational: err?.isOperational,
      stack: isDev ? formattedStack : undefined,
    });
};
