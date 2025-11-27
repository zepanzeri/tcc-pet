import { Request, Response } from 'express';
import { Usuario, UsuarioModel } from '../models/Usuario.model';

export class UsuarioController {

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const { Nome, Email, Senha, Sexo, Estado, Cidade }: Usuario = req.body;
            const usuarioCadastrado = await UsuarioModel.findOne({ Email: Email.toLowerCase() });
            if(usuarioCadastrado) {
                return res.status(400).send('Usuario ja cadastrado');
            }
            const novoUsuario = await UsuarioModel.create({
                Nome: Nome,
                Email: Email,
                Senha: Senha,
                Sexo: Sexo,
                Estado: Estado,
                Cidade: Cidade
            });
            if(novoUsuario.id) {
                return res.status(200).json(novoUsuario);
            }

        }
        catch(e) {
            return res.status(500).send(`Erro: ${e}`);
        }
    }

    static async getUsuario(req: Request, res: Response): Promise<any> {
        try {
            const { Email } = req.body;   
            const usuario = await UsuarioModel.findOne({
                Email: Email                
            });        
            if(usuario) {
                return res.status(200).json(usuario);
            }
            return res.status(400).send('Usuario não encontrado');
        }
        catch(e) {
            return res.status(500).send(`Erro: ${e}`);
        }
    }

}
export default UsuarioController;