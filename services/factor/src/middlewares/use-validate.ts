import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const useValidate = <T>(
  schema: ZodType<any, any, any>,
  target: "body" | "query" | "params" = "body",
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[target];
      const validatedData = (await schema.parseAsync(dataToValidate)) as T;
      if (target !== "query") req[target] = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // FIX: Use .issues instead of .errors
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors: errorMessages, // We still send the response object as 'errors'
        });
      }
      next(error);
    }
  };
};
