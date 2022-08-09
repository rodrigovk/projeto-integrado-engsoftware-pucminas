import express from 'express';
import cliente from './cliente.routes';
import usuario from './usuario.routes';

const router = express.Router();

router.use(cliente);
router.use(usuario);

export default router;