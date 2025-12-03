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
                    Sexo: 'F',
                    Castrado: true,
                    Vacinas: 'V4, Antirrabica',
                    IdEspecie: 2,
                    IdUsuario: 1                                        
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