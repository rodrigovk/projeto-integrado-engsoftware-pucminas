import { Router } from "express";
import { createUsuarioController, findUsuarioByIdUsuarioController } from "@controllers/usuario";

const router = Router();

router.get("/usuarios/:id", (request, response) => { return findUsuarioByIdUsuarioController.handle(request, response) });
router.post("/usuarios", (request, response) => { return createUsuarioController.handle(request, response) });

export default router;