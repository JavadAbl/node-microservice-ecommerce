import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { config } from "../infrastructure/config.js";

export const authService = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};

const JWT_ACCESS_SECRET = config.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export interface TokenPayload {
  userId: number;
  role?: string;
}

export interface DecodedToken extends TokenPayload, JwtPayload {
  iat: number;
  exp: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generates both Access and Refresh tokens.
 */
function generateTokens(payload: TokenPayload): TokenResponse {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
}

/**
 * Generates a short-lived Access Token
 */
function generateAccessToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    issuer: "your-app-name", // Optional: identifies the issuer
    audience: "your-app-users", // Optional: identifies the audience
  };

  return jwt.sign(payload, JWT_ACCESS_SECRET, options);
}

/**
 * Generates a long-lived Refresh Token
 */
function generateRefreshToken(payload: TokenPayload): string {
  const options: SignOptions = { expiresIn: REFRESH_TOKEN_EXPIRES_IN };

  // Usually refresh tokens have a different secret to enhance security
  return jwt.sign(payload, JWT_REFRESH_SECRET, options);
}

/**
 * Verifies an Access Token
 * Returns the decoded payload if valid, or throws an error if invalid/expired
 */
function verifyAccessToken(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    // Handle specific errors (e.g., TokenExpiredError)
    throw new Error("Invalid or Expired Access Token");
  }
}

/**
 * Verifies a Refresh Token
 * Returns the decoded payload if valid, or throws an error if invalid/expired
 */
function verifyRefreshToken(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or Expired Refresh Token");
  }
}
