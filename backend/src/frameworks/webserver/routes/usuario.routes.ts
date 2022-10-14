import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import { createUsuarioController, findUsuarioByIdUsuarioController, deleteUsuarioController, findManyUsuarioByIdUsuarioController, getDashInfoController } from "@controllers/usuario";

const router = Router();

router
  .get("/usuarios", basicAuth(true), (request, response) => { return findManyUsuarioByIdUsuarioController.handle(request, response) })
  .get("/usuarios/:id", basicAuth(true), (request, response) => { return findUsuarioByIdUsuarioController.handle(request, response) })
  .post("/usuarios", basicAuth(true), (request, response) => { return createUsuarioController.handle(request, response) })
  .delete("/usuarios/:id", basicAuth(true), (request, response) => { return deleteUsuarioController.handle(request, response) })
  .get("/usuarios/:id/dash-info", basicAuth(false), (request, response) => { return getDashInfoController.handle(request, response) });

export default router;