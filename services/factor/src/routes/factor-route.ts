import express from "express";
import { factorController } from "../controllers/factor-controller.js";
import { useValidate } from "../middlewares/use-validate.js";
import { CreateFactorSchema } from "../schemas/factor/create-factor-schema.js";

export const factorRoutes = express.Router();

factorRoutes.get("/", factorController.getFactors);
factorRoutes.get("/:id", factorController.getFactorById);
factorRoutes.post("/", useValidate(CreateFactorSchema, "body"), factorController.createFactor);
factorRoutes.put("/:id", factorController.updateFactor);
factorRoutes.delete("/:id", factorController.deleteFactor);
