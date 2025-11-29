import { Request, response, Response } from 'express';
import bcrypt from "bcryptjs";
import { Usuario, UsuarioModel } from '../models/Usuario.model';
import { ApiResponse } from '../models/ApiResponse.model';


export class UsuarioController {    

    static async create(req: Request, res: Response): Promise<any> {
        let response: ApiResponse = {} as ApiResponse;
        try {
            const { Nome, Email, Senha, Sexo, Estado, Cidade }: Usuario = req.body;
            const usuarioCadastrado = await UsuarioModel.findOne({ Email: Email.toLowerCase() });
            if(usuarioCadastrado) {
                response.CodigoStatus = 400;   
                response.Sucesso = false;
                response.Erro = 'Usuario já cadastrado';
                return res.json(response);
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
                response.CodigoStatus = 200;
                response.Sucesso = true;                
                return res.json(response);
            }

        }
        catch(e) {
            response.CodigoStatus = 500;
            response.Sucesso = false;
            response.Erro = `Erro: ${e}`
            return res.json(response);
        }
    }

    static async getUsuario(req: Request, res: Response): Promise<any> {
        let response: ApiResponse = {} as ApiResponse;
        try {
            const { Email, Senha } = req.body;   
            const usuario = await UsuarioModel.findOne({
                Email: Email                
            });        
            if(usuario) {
                const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);
                if(senhaCorreta) {
                    response.CodigoStatus = 200;
                    response.Sucesso = true;
                    response.Usuario = usuario;
                    return res.json(response);
                }    
                response.CodigoStatus = 400;
                response.Sucesso = false;
                response.Erro = 'Senha incorreta'
                return res.json(response);        
            }
            response.CodigoStatus = 400;
            response.Erro = 'Usuario não encontrado';
            response.Sucesso = false;
            return res.json(response);
        }
        catch(e) {
            response.CodigoStatus = 500;
            response.Sucesso = false;
            response.Erro = `Erro: ${e}`;
            return res.json(response);
        }
    }

}
export default UsuarioController;