import { PrismaProvider } from "../infrastructure/database/prisma.provider.js";
import { LoginRequest } from "../schemas/auth/login.request.js";
import { AuthDto } from "../schemas/auth/auth.dto.js";
import { JwtUtil } from "../utils/jwt.util.js";
import { app } from "../index.js";
import { RegisterRequest } from "../schemas/auth/register.request.js";
import { BcryptUtil } from "../utils/bcrypt.uril.js";
import {
  throwCONFLICT,
  throwNOT_FOUND,
  throwUNAUTHORIZED,
} from "../utils/app-error.js";
import {
  InspectTokenDto,
  InspectTokenRequest,
} from "../schemas/auth/inspect-token.request.js";
import {
  RenewTokenDto,
  RenewTokenRequest,
} from "../schemas/auth/renew-token.request.js";

const prisma = PrismaProvider.getInstance();

async function login(payload: LoginRequest): Promise<AuthDto> {
  const { username, password } = payload;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      roles: { select: { name: true } },
      claims: { select: { name: true } },
    },
  });

  if (!user) throwNOT_FOUND("User");

  const isPasswordMatch = await BcryptUtil.verifyPassword(
    password,
    user.password
  );

  if (!isPasswordMatch) throwUNAUTHORIZED();

  const { accessToken, refreshToken } = await JwtUtil.generateTokens(app, user);

  return { accessToken, refreshToken, user };
}

async function register(payload: RegisterRequest): Promise<AuthDto> {
  const { username, password, email } = payload;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) throwCONFLICT("User");

  const hashedPassword = await BcryptUtil.hashPassword(password);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
    include: {
      roles: { select: { name: true } },
      claims: { select: { name: true } },
    },
  });

  const { accessToken, refreshToken } = await JwtUtil.generateTokens(
    app,
    newUser
  );

  return { accessToken, refreshToken, user: newUser };
}

async function renewToken(payload: RenewTokenRequest): Promise<RenewTokenDto> {
  const { refreshToken } = payload;

  const decoded = await JwtUtil.verifyToken(app, refreshToken);
  if (!decoded || !decoded.userId) throwUNAUTHORIZED();

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      roles: { select: { name: true, id: false } },
      claims: { select: { name: true } },
    },
  });
  if (!user) throwUNAUTHORIZED();

  const { accessToken, refreshToken: newRefreshToken } =
    await JwtUtil.generateTokens(app, user);

  return { accessToken, refreshToken: newRefreshToken };
}

export const authService = { login, register, renewToken };
