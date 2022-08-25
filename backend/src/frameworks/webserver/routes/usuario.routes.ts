import { Router } from "express";
import { createUsuarioController, findUsuarioByIdUsuarioController, deleteUsuarioController, findManyUsuarioByIdUsuarioController, getDashInfoController } from "@controllers/usuario";

const router = Router();

router.get("/usuarios", (request, response) => { return findManyUsuarioByIdUsuarioController.handle(request, response) });
router.get("/usuarios/:id", (request, response) => { return findUsuarioByIdUsuarioController.handle(request, response) });
router.post("/usuarios", (request, response) => { return createUsuarioController.handle(request, response) });
router.delete("/usuarios/:id", (request, response) => { return deleteUsuarioController.handle(request, response) });
router.get("/usuarios/:id/dash-info", (request, response) => { return getDashInfoController.handle(request, response) });

export default router;