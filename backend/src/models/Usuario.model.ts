import { Schema, Document, model } from 'mongoose'
import bcrypt from "bcryptjs";

export interface Usuario extends Document {
    Nome: string;
    Email: string;
    Senha: string;
    Sexo: string;
    Estado: string;
    Cidade: string;    
}

const UsuarioSchema: Schema = new Schema<Usuario>(
    {
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
            required: true
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
        collection: 'usuarios'
    }
);

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

export const UsuarioModel = model<Usuario>('Usuario', UsuarioSchema);