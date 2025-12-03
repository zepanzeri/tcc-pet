import { Request, Response } from 'express';
import { ApiResponse } from '../models/ApiResponse.model';
import PetModel from '../models/Pet.model';
import { UsuarioModel } from '../models/Usuario.model';


export class PetController {
    static async getPets(req: Request, res: Response): Promise<any> {
        let response: ApiResponse = {} as ApiResponse; 
        try {
            const pets = await PetModel.find();
            if(pets) {
                response.CodigoStatus = 200;
                response.Sucesso = true;
                response.Pets = pets;

                return res.json(response);
            }
            response.CodigoStatus = 400;
            response.Sucesso = false;
            response.Erro = 'Pets não encontrados';

            return res.json(response);
        }
        catch(e) {
            response.CodigoStatus = 500;
            response.Erro = `Erro: ${e}`;
            response.Sucesso = false;

            return res.json(response);
        }
    }

        static async getPetsUsuario(req: Request, res: Response): Promise<any> {
        let response: ApiResponse = {} as ApiResponse; 
        try {
            const { Email } = req.body;
            const usuario = await UsuarioModel.findOne({
                Email: Email
            });
            if(usuario) {
                const pets = await PetModel.find().where({                    
                    IdUsuario: usuario.IdUsuario
                }); 
                if(pets) {
                    response.CodigoStatus = 200;
                    response.Sucesso = true;
                    response.Pets = pets;
                    
                    return res.json(response);
                }
                response.CodigoStatus = 400;
                response.Sucesso = false;
                response.Erro = 'Pets não encontrados';  

                return res.json(response);        
            }
            response.CodigoStatus = 400;
            response.Sucesso = false;
            response.Erro = 'Usuario não encontrado';  

            return res.json(response);
        }
        catch(e) {
            response.CodigoStatus = 500;
            response.Erro = `Erro: ${e}`;
            response.Sucesso = false;

            return res.json(response);
        }
    }
}
export default PetController;