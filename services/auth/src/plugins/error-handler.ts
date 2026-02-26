import { config } from "../infrastructure/config.js";
import { StatusCodes } from "http-status-codes";
import { app } from "../server.js";

export const errorHandler = (error: any, request: any, reply: any) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal Server Error";
  const formattedStack = error.stack ? error.stack?.split("\n") : undefined;

  const logObj = {
    message,
    statusCode,
    url: request.url,
    isOperational: error?.isOperational,
    method: request.method,
    params: request.params,
    body: request.body,
    stack: formattedStack,
  };

  app.log.error(logObj);
  console.error(error?.message);

  reply
    .status(statusCode)
    .send({
      message,
      statusCode,
      isOperational: error?.isOperational,
      stack: config.NODE_ENV === "development" ? formattedStack : undefined,
    });
};
