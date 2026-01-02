import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  HTTP_PORT: parseInt(process.env.HTTP_PORT),
  HTTP_HOST: process.env.HTTP_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: parseInt(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
