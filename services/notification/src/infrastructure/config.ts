import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  HTTP_PORT: parseInt(process.env.HTTP_PORT),
  HTTP_HOST: process.env.HTTP_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
