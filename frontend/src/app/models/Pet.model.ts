export interface Pet {
    IdPet?: number;
    Nome: string;
    Raca: string;
    DtNascimento: Date;
    Sexo: string;
    Castrado: boolean;
    Vacinas?: string;
    Especie?: any;
    Usuario?: any;
    Cor: string;
    Imagens?: any[];
}