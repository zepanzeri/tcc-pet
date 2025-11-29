import { Usuario } from "./Usuario.model";

export interface ApiResponse {
    CodigoStatus: number;
    Sucesso: boolean;
    Erro?: string;
    Usuario?: Usuario
}