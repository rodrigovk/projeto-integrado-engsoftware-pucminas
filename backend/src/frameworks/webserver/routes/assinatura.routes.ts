import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import { findAssinaturaByIdAssinaturaController, findManyAssinaturaController, createAssinaturaController, alterAssinaturaController, deleteAssinaturaController, alterAssinaturaSituacaoController, generateContaAssinaturaController, generateContasAssinaturaVencimentoProximoController } from "@controllers/assinatura";

const router = Router();

router
  .get("/assinaturas/:id", basicAuth(true), (request, response) => { return findAssinaturaByIdAssinaturaController.handle(request, response) })
  .get("/assinaturas", basicAuth(false), (request, response) => { return findManyAssinaturaController.handle(request, response) })
  .post("/assinaturas", basicAuth(true), (request, response) => { return createAssinaturaController.handle(request, response) })
  .put("/assinaturas/:id", basicAuth(true), (request, response) => { return alterAssinaturaController.handle(request, response) })
  .delete("/assinaturas/:id", basicAuth(true), (request, response) => { return deleteAssinaturaController.handle(request, response) })
  .put("/assinaturas/:id/situacao", basicAuth(true), (request, response) => { return alterAssinaturaSituacaoController.handle(request, response) })
  .post("/assinaturas/:id/conta", basicAuth(true), (request, response) => { return generateContaAssinaturaController.handle(request, response) })
  .post("/assinaturas/conta", basicAuth(true), (request, response) => { return generateContasAssinaturaVencimentoProximoController.handle(request, response) });

export default router;