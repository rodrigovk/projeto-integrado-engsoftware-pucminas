import { Router } from "express";
import { createUsuarioController, findUsuarioByIdUsuarioController, deleteUsuarioController, findManyUsuarioByIdUsuarioController } from "@controllers/usuario";

const router = Router();

router.get("/login", (_request, response) => { return response.status(204).send() });
router.get("/usuarios", (request, response) => { return findManyUsuarioByIdUsuarioController.handle(request, response) });
router.get("/usuarios/:id", (request, response) => { return findUsuarioByIdUsuarioController.handle(request, response) });
router.post("/usuarios", (request, response) => { return createUsuarioController.handle(request, response) });
router.delete("/usuarios/:id", (request, response) => { return deleteUsuarioController.handle(request, response) });

export default router;