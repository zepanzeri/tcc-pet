import { Router } from 'express'

import { UsuarioController } from '../controllers/Usuario.controller';

const router = Router();

router.get('/', UsuarioController.create);

export default router;


