import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario.model';

export class UsuarioController {

    static async create(req: Request, res: Response): Promise<void> {
        const { Nome, Email, Senha, Sexo, Estado, Cidade }: Usuario = req.body;
    }

}