import express from "express";
import { factorController } from "../controllers/factor-controller.js";
import { useValidate } from "../middlewares/use-validate.js";
import { createFactorSchema } from "../schemas/factor/create-factor-schema.js";

export const factorRoutes = express.Router();

factorRoutes.get("/", useValidate(createFactorSchema), factorController.getFactors);
factorRoutes.get("/:id", factorController.getFactorById);
factorRoutes.post("/", factorController.createFactor);
factorRoutes.put("/:id", factorController.updateFactor);
factorRoutes.delete("/:id", factorController.deleteFactor);
