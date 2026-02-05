export interface TypedRequest<B, P, Q> extends Express.Request {
  body: B;
  params: P;
  query: Q;
}
