import { Request, Response } from 'express';
import { ApiResponse } from '../models/ApiResponse.model';
import EspecieModel from '../models/Especie.model';

export class EspecieController {
    static async getEspecies(req: Request, res: Response): Promise<any> {        
        let response: ApiResponse = {} as ApiResponse;
        try {
            const especies = await EspecieModel.find();
            if(especies) {
                response.Sucesso = true;
                response.CodigoStatus = 200;
                response.Especies = especies;
                
                return res.json(response);
            }
            response.Sucesso = false;
            response.CodigoStatus = 400;
            response.Erro = 'Especies não escontradas';

            return res.json(response);
        } catch(e) {
            response.Sucesso = false;
            response.CodigoStatus = 500;
            response.Erro = `Erro: ${e}`;

            return res.json(response);
        }
    }
}

export default EspecieController;