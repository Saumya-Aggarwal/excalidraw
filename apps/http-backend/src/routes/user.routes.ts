import { Router } from "express";
import { register, login } from "../controllers/user.controllers";
import validateSchema from "../middlewares/schemaValidation";
import { loginSchema, registerSchema } from "@repo/schemas";

const router: Router = Router();
router.post("/login", validateSchema(loginSchema), login);
router.post("/register",validateSchema(registerSchema), register);

export default router;
