import { Router } from "express";
import { findClienteByIdClienteController, createClienteController } from "@controllers/cliente";

const router = Router();

router.get("/clientes/:id", (request, response) => { return findClienteByIdClienteController.handle(request, response) });
router.post("/clientes", (request, response) => { return createClienteController.handle(request, response) });

export default router;