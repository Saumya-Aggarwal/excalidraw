import { Router } from "express";
import { enterRoom } from "../controllers/room.controllers";
import authenticate from "../middlewares/auth";
import validateSchema from "../middlewares/schemaValidation";
import { roomSchema } from "@repo/schemas";
const router : Router = Router();

router.post("/joinRoom",validateSchema(roomSchema) ,authenticate,enterRoom);

export default router;