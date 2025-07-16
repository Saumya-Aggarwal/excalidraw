import { z } from "zod";

export const roomSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
});

export type Room = z.infer<typeof roomSchema>;

export const publicRoomSchema = roomSchema
