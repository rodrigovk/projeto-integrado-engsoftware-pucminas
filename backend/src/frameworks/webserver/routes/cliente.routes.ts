import { Router } from "express";
import { findClienteByIdClienteController, findManyClienteController, createClienteController } from "@controllers/cliente";

const router = Router();

router.get("/clientes/:id", (request, response) => { return findClienteByIdClienteController.handle(request, response) });
router.get("/clientes", (request, response) => { return findManyClienteController.handle(request, response) });
router.post("/clientes", (request, response) => { return createClienteController.handle(request, response) });

export default router;