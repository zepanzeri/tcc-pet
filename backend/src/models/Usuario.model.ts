import mongoose, { Schema, Document, model } from 'mongoose'
import bcrypt from "bcryptjs";

export interface Usuario extends Document {
    IdUsuario: number;
    Nome: string;
    Email: string;
    Senha: string;
    Sexo: string;
    Estado: string;
    Cidade: string;    
}

const UsuarioSchema: Schema = new Schema<Usuario>(
    {
        IdUsuario: {
            type: Number,
            unique: true
        },
        Nome: {
            type: String,
            required: true,
            trim: true
        },
        Email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        Senha: {
            type: String,
            required: true,
            select: false
        },
        Sexo: {
            type: String,
            required: true
        },
        Estado: {
            type: String,
            required: true
        },
        Cidade: {
            type: String,
            required: true
        }    
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UsuarioSchema.index({ Email: 1 }), { unique: true };

UsuarioSchema.pre('save', async function(next) {
    if(!this.isModified('Senha')) 
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.Senha = await bcrypt.hash(this.Senha, salt);
        next();
    }
    catch(e) {
        next(e as any);
    }
});

UsuarioSchema.pre('save', async function(next){
    if(this.isNew && !this.IdUsuario) {
        try {
            const ultimoRegistro = await mongoose.model('Usuario')
                .findOne()
                .sort({ IdUsuario: -1 });            
            this.IdUsuario = ultimoRegistro ? ultimoRegistro.IdUsuario + 1 : 1;
        }
        catch(e) {
            this.IdUsuario = 1;
        }
    }
    next();
});


export const UsuarioModel = model<Usuario>('Usuario', UsuarioSchema);