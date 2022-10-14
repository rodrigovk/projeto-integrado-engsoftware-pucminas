import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import { findAdministradorByIdAdministradorController, findManyAdministradorController, createAdministradorController, alterAdministradorController, deleteAdministradorController, alterAdministradorSituacaoController } from "@controllers/administrador";

const router = Router();

router
  .get("/administradores/:id", basicAuth(true), (request, response) => { return findAdministradorByIdAdministradorController.handle(request, response) })
  .get("/administradores", basicAuth(true), (request, response) => { return findManyAdministradorController.handle(request, response) })
  .post("/administradores", basicAuth(true), (request, response) => { return createAdministradorController.handle(request, response) })
  .put("/administradores/:id", basicAuth(true), (request, response) => { return alterAdministradorController.handle(request, response) })
  .delete("/administradores/:id", basicAuth(true), (request, response) => { return deleteAdministradorController.handle(request, response) })
  .put("/administradores/:id/situacao", basicAuth(true), (request, response) => { return alterAdministradorSituacaoController.handle(request, response) });

export default router;