import { Router } from 'express'

import { UsuarioController } from '../controllers/Usuario.controller';

const usuarioRouter = Router();

usuarioRouter.post('/usuario/login', UsuarioController.getUsuario);
usuarioRouter.post('/usuario/cadastrar', UsuarioController.create);

export default usuarioRouter;


