import express from "express";
import cliente from "./cliente.routes";
import usuario from "./usuario.routes";
import ticket from "./ticket.router";

const router = express.Router();

router.use(cliente);
router.use(usuario);
router.use(ticket);

export default router;