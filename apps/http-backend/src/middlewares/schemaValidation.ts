import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

function validateSchema(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result?.error?.errors[0]?.message });
      return;
    }
    console.log("Schema validation passed:- Result : ", result);
    next();
  };
}

export default validateSchema;
