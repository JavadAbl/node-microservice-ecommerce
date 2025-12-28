import { FastifyReply, FastifyRequest } from "fastify";
import { config } from "../infrastructure/config.js";
import { app } from "../index.js";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal Server Error";
  const formattedStack = error.stack ? error.stack?.split("\n") : undefined;

  app.log.error({
    message,
    statusCode,
    url: request.url,
    isOperational: error?.isOperational,
    method: request.method,
    params: request.params,
    body: request.body,
    stack: formattedStack,
  });

  reply.status(statusCode).send({
    message,
    statusCode,
    isOperational: error?.isOperational,
    stack: config.NODE_ENV === "development" ? formattedStack : undefined,
  });
};
