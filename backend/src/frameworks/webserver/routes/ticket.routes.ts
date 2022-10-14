import { Router } from "express";
import basicAuth from "@frameworks/webserver/middlewares/basicAuth";
import {
  findTicketByIdTicketController, findManyTicketController, createTicketController, alterTicketSituacaoController,
  createTicketRespostaController,
} from "@controllers/ticket";

const router = Router();

router
  .get("/tickets", basicAuth(false), (request, response) => { return findManyTicketController.handle(request, response) })
  .get("/tickets/:id", basicAuth(false), (request, response) => { return findTicketByIdTicketController.handle(request, response) })
  .post("/tickets", basicAuth(false), (request, response) => { return createTicketController.handle(request, response) })
  .put("/tickets/:id/situacao", basicAuth(false), (request, response) => { return alterTicketSituacaoController.handle(request, response) });

// resposta
router
  .post("/tickets/:id/respostas", (request, response) => { return createTicketRespostaController.handle(request, response) });

export default router;