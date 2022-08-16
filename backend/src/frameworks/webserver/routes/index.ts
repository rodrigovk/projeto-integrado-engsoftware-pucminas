import express from "express";
import auth from "./auth.routes";
import usuario from "./usuario.routes";
import administrador from "./administrador.routes";
import cliente from "./cliente.routes";
import ticket from "./ticket.routes";

const router = express.Router();

router.use(auth);

const routerAuth = express.Router();

routerAuth.use(usuario);
routerAuth.use(administrador);
routerAuth.use(cliente);
routerAuth.use(ticket);

export { router, routerAuth };