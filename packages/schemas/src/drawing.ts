import { z } from "zod";

export const DrawingSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  rotation: z.number().optional(),
  strokeColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  strokeWidth: z.number().optional(),
});

export type Drawing = z.infer<typeof DrawingSchema>;
