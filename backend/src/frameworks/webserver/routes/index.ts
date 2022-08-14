import express from "express";
import usuario from "./usuario.routes";
import administrador from "./administrador.routes";
import cliente from "./cliente.routes";
import ticket from "./ticket.router";

const router = express.Router();

router.use(usuario);
router.use(administrador);
router.use(cliente);
router.use(ticket);

export default router;