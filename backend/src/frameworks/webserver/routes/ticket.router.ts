import { Router } from "express";
import { createTicketController, findTicketByIdTicketController, findManyTicketByIdTicketController } from "@controllers/ticket";

const router = Router();

router.get("/clientes/:id/tickets", (request, response) => { return findManyTicketByIdTicketController.handle(request, response) }); //?
router.get("/tickets/:id", (request, response) => { return findTicketByIdTicketController.handle(request, response) });
router.post("/tickets", (request, response) => { return createTicketController.handle(request, response) });

// resposta
//?router.post("/tickets/:id/respostas", (request, response) => { return createTicketRespostaController.handle(request, response) });

export default router;