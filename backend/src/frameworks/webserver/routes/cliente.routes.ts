import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import { findClienteByIdClienteController, findManyClienteController, createClienteController, alterClienteController, deleteClienteController, alterClienteSituacaoController } from "@controllers/cliente";

const router = Router();

router
  .get("/clientes/:id", basicAuth(true), (request, response) => { return findClienteByIdClienteController.handle(request, response) })
  .get("/clientes", basicAuth(true), (request, response) => { return findManyClienteController.handle(request, response) })
  .post("/clientes", basicAuth(true), (request, response) => { return createClienteController.handle(request, response) })
  .put("/clientes/:id", basicAuth(true), (request, response) => { return alterClienteController.handle(request, response) })
  .delete("/clientes/:id", basicAuth(true), (request, response) => { return deleteClienteController.handle(request, response) })
  .put("/clientes/:id/situacao", basicAuth(true), (request, response) => { return alterClienteSituacaoController.handle(request, response) });

export default router;