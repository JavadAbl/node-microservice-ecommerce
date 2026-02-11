import { Request } from "express";

declare module "express" {
  interface Request {
    body: any;
    params: any;
    query: any;
  }
}

export interface TypedRequest<B, P, Q> extends Express.Request {
  body: B;
  params: P;
  query: Q;
}
