import { Router } from "express";
import { authController } from "@controllers/auth";

const router = Router();

router.post("", (request, response) => { return authController.handle(request, response) });

export default router;