import PetModel from "../models/Pet.model";

export default async function insertPet() {
    try {
        const dadosInseridos = await PetModel.countDocuments();      
        if(dadosInseridos === 0) {
            const pets = [
                {
                    Nome: 'Mimi',
                    DtNascimento: '2022-01-01',
                    Raca: 'SRD',
                    Cor: 'Cinza',
                    Sexo: 'F',
                    Castrado: true,
                    Vacinas: 'V4, Antirrabica',
                    IdEspecie: 2,
                    IdUsuario: 1,
                    Imagens: ['mimi1.jpg', 'mimi2.jpg']                                
                },
                {
                    Nome: 'Tobias',
                    DtNascimento: '2021-03-01',
                    Raca: 'Beagle',
                    Cor: 'Branco/Marrom',
                    Sexo: 'M',
                    Castrado: true,
                    Vacinas: 'Antirrabica',
                    IdEspecie: 1,
                    IdUsuario: 1,
                    Imagens: ['tobias1.jpg', 'tobias2.jpg']                                      
                },
                {
                    Nome: 'Catatau',
                    DtNascimento: '2025-04-22',
                    Raca: 'SRD',
                    Cor: 'Marrom',
                    Sexo: 'M',
                    Castrado: false,
                    Vacinas: '',
                    IdEspecie: 3,
                    IdUsuario: 2,
                    Imagens: ['catatau1.jpg']                                      
                }           
            ];

            for(const pet of pets) {
                await PetModel.create(pet);
            }           
        }
    } catch(e) {
        console.log(e);
    }
}

insertPet();