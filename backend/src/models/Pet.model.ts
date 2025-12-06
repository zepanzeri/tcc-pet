import mongoose, { Schema, Document, Types } from 'mongoose'

export interface Pet extends Document {
    IdPet: number;
    Nome: string;
    Raca: string;
    DtNascimento: Date;
    Sexo: string;
    Castrado: boolean;
    Vacinas: string;
    IdEspecie: number;
    IdUsuario: number;
    Cor: string;
    Imagens?: string[];
}

const PetSchema: Schema = new Schema<Pet>(
    { 
        IdPet: {
            type: Number,
            unique: true
        },
        Nome: {
            type: String,
            required: true,
            trim: true            
        },      
        DtNascimento: {
            type: Date
        },       
        Raca: {
            type: String,                        
        },
        Sexo: {
            type: String,
            required: true
        },
        Castrado: {
            type: Boolean,
            required: true
        },
        Vacinas: {
            type: String            
        },
        IdEspecie: {
            type: Number,
            ref: 'Especie',
            required: true
        },
        IdUsuario: {
            type: Number,
            ref: 'Usuario',
            required: true
        },
        Cor: {
            type: String
        },
        Imagens: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
);

PetSchema.pre('save', async function(next){
    if(this.isNew && !this.IdPet) {
        try {
            const ultimoRegistro = await mongoose.model('Pet')
                .findOne()
                .sort({ IdPet: -1 });            
            this.IdPet = ultimoRegistro ? ultimoRegistro.IdPet + 1 : 1;
        }
        catch(e) {
            this.IdPet = 1;
        }
    }
    next();
});


export default mongoose.model<Pet>('Pet', PetSchema);