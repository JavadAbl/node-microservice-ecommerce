import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { factorService } from "../services/vehicle-service.js";

// Optional: Define request types if you're using Zod or similar with Express (e.g., via middleware)
// For simplicity, we'll use generic Request with type assertions

export async function getFactors(req: Request, res: Response, next: NextFunction) {
  const factors = await factorService.getMany(req.query);
  res.json(factors as FactorDto[]);
}

export async function getFactorById(req: Request, res: Response, next: NextFunction) {
  const factor = await factorService.getById(req.params.id);
  if (!factor) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.json(factor as FactorDto);
}

export async function createFactor(req: Request, res: Response, next: NextFunction) {
  const factor = await factorService.create(req.body);
  res.status(StatusCodes.CREATED).json(factor as FactorDto);
}

export async function updateFactor(req: Request, res: Response, next: NextFunction) {
  const updated = await factorService.update(req.params.id, req.body);
  if (!updated) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.json(updated);
}

export async function deleteFactor(req: Request, res: Response, next: NextFunction) {
  const deleted = await factorService.deleteById(req.params.id);
  if (!deleted) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Factor not found" });
  }
  res.status(StatusCodes.NO_CONTENT).send(); // or res.sendStatus(StatusCodes.NO_CONTENT)
}

export const factorController = { getFactors, getFactorById, createFactor, updateFactor, deleteFactor };
