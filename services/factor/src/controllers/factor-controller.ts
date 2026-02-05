import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { factorService } from "../services/factor-service.js";
import { TypedRequest } from "../types/express-types.js";
import { CreateFactor } from "../schemas/factor/create-factor-schema.js";

export async function getFactors(req: Request, res: Response) {
  const factors = await factorService.getMany(req.query);

  return res.json(factors);
}

export async function getFactorById(req: Request, res: Response) {
  const factor = await factorService.getById(req.params.id);
  if (!factor) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.json(factor as FactorDto);
}

export async function createFactor(req: TypedRequest<CreateFactor, {}, {}>, res: Response) {
  const factor = await factorService.create(req.body);
  res.status(StatusCodes.CREATED).json(factor);
}

export async function updateFactor(req: Request, res: Response) {
  const updated = await factorService.update(req.params.id, req.body);
  if (!updated) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.json(updated);
}

export async function deleteFactor(req: Request, res: Response) {
  const deleted = await factorService.deleteById(req.params.id);
  if (!deleted) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.status(StatusCodes.NO_CONTENT).send(); // or res.sendStatus(StatusCodes.NO_CONTENT)
}

export const factorController = { getFactors, getFactorById, createFactor, updateFactor, deleteFactor };
