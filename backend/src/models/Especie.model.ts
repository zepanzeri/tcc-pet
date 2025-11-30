import mongoose, { Schema, Document } from 'mongoose';


export interface Especie extends Document {
    IdEspecie: number;
    Descricao: string;
}

const EspecieSchema: Schema<Especie> = new Schema<Especie>(
    {       
        IdEspecie: {
            type: Number,
            unique: true
        },
        Descricao: {
            type: String,
            required: true,
            unique: true
        }
    },          
    {
        timestamps: false,
        versionKey: false
    }
);

EspecieSchema.pre('save', async function(next){
    if(this.isNew && !this.IdEspecie) {
        try {
            const ultimoRegistro = await mongoose.model('Especie')
                .findOne()
                .sort({ IdEspecie: -1 });            
            this.IdEspecie = ultimoRegistro ? ultimoRegistro.IdEspecie + 1 : 1;
        }
        catch(e) {
            this.IdEspecie = 1;
        }
    }
    next();
});

export default mongoose.model<Especie>('Especie', EspecieSchema);