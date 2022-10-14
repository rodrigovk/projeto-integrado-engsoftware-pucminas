import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import { findContaByIdContaController, findManyContaController, createContaController, encloseContaController, } from "@controllers/conta";

const router = Router();

router
  .get("/contas/:id", basicAuth(true), (request, response) => { return findContaByIdContaController.handle(request, response) })
  .get("/contas", basicAuth(false), (request, response) => { return findManyContaController.handle(request, response) })
  .post("/contas", basicAuth(true), (request, response) => { return createContaController.handle(request, response) })
  .put("/contas/:id/pagar", basicAuth(true), (request, response) => { return encloseContaController.handle(request, response) });

export default router;