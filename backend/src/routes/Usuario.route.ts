import { Router } from 'express'

import { UsuarioController } from '../controllers/Usuario.controller';

const usuarioRouter = Router();

usuarioRouter.get('/usuario', UsuarioController.getUsuario);
usuarioRouter.post('/usuario/login', UsuarioController.login);
usuarioRouter.post('/usuario/cadastrar', UsuarioController.create);

export default usuarioRouter;


