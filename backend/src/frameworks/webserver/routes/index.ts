import express from "express";
import auth from "./auth.routes";
import usuario from "./usuario.routes";
import administrador from "./administrador.routes";
import cliente from "./cliente.routes";
import ticket from "./ticket.routes";
import assinatura from "./assinatura.routes";
import conta from "./conta.routes";

const router = express.Router();

router
  .use(auth)
  .use(usuario)
  .use(administrador)
  .use(cliente)
  .use(ticket)
  .use(assinatura)
  .use(conta);

export { router };