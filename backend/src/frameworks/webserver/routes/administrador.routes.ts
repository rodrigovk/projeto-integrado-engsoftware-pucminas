import { Router } from "express";
import { findAdministradorByIdAdministradorController, findManyAdministradorController, createAdministradorController } from "@controllers/administrador";

const router = Router();

router.get("/administradores/:id", (request, response) => { return findAdministradorByIdAdministradorController.handle(request, response) });
router.get("/administradores", (request, response) => { return findManyAdministradorController.handle(request, response) });
router.post("/administradores", (request, response) => { return createAdministradorController.handle(request, response) });

export default router;