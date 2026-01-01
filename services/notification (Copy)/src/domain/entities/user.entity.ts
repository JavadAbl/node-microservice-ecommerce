export interface User {
  userId: number;
  email: string;
  password: string;
  roles: string[];
  claims: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: { userId: number; email: string; roles: string[] };
}
