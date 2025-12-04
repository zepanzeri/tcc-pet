import { Pet } from "./Pet.model";
import { Usuario } from "./Usuario.model";

export interface ApiResponse {
    CodigoStatus: number;
    Sucesso: boolean;
    Erro?: string;
    Usuario?: any;
    Pets?: Pet[]
}