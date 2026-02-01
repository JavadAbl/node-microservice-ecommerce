import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * A wrapper factory that validates the request against a Zod schema.
 * It will transform data (coercion) and replace req.body/req.query/req.params.
 */
export const useValidate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validate and Transform data simultaneously
      // Zod's .parse() will throw if validation fails, but returns transformed data if it passes
      const result = await schema.parseAsync({ body: req.body, query: req.query, params: req.params });

      // 2. Update the request object with the transformed/cleaned data
      req.body = result.body;
      req.query = result.query;
      req.params = result.params;

      // 3. Move to next middleware/controller
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // 4. Return formatted error response
        res
          .status(400)
          .json({
            status: "error",
            message: "Invalid request data",
            errors: error.errors.map((err) => ({ field: err.path.join("."), message: err.message })),
          });
      } else {
        next(error);
      }
    }
  };
