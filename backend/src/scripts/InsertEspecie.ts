import EspecieModel from "../models/Especie.model";

export default async function insert() {
    try {
        const dadosInseridos = await EspecieModel.countDocuments();      
        if(dadosInseridos === 0) {
            const especies = [
                { Descricao: 'Cachorro' },
                { Descricao: 'Felino' },
                { Descricao: 'Roedor' },
                { Descricao: 'Ave' },
                { Descricao: 'Outro' }
            ];

            for(const especie of especies) {
                await EspecieModel.create(especie);
            }           
        }
    } catch(e) {
        console.log(e);
    }
}

insert();