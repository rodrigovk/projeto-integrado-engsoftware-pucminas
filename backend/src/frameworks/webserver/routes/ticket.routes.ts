import { Router } from "express";
import { findTicketByIdTicketController, findManyTicketController, findManyTicketByIdClienteController, createTicketController, alterTicketSituacaoController,
  createTicketRespostaController, } from "@controllers/ticket";

const router = Router();

router.get("/clientes/:id/tickets", (request, response) => { return findManyTicketByIdClienteController.handle(request, response) }); //?
router.get("/tickets", (request, response) => { return findManyTicketController.handle(request, response) });
router.get("/tickets/:id", (request, response) => { return findTicketByIdTicketController.handle(request, response) });
router.post("/tickets", (request, response) => { return createTicketController.handle(request, response) });
router.put("/tickets/:id/situacao", (request, response) => { return alterTicketSituacaoController.handle(request, response) });

// resposta
router.post("/tickets/:id/respostas", (request, response) => { return createTicketRespostaController.handle(request, response) });

export default router;