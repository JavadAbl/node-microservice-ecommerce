import { FactorStatus } from "../../../infrastructure/database/generated/prisma/client.js";

export type FactorDto = {
  id: number;
  factorNumber: string;
  status: FactorStatus;
  issuedAt: Date;
  totalPrice: number;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;

  items: {
    id: number;
    description: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    service: { name: string };
  }[];
};
