import { Schema, Document, model } from 'mongoose'

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
            required: true
        },
        Email: {
            type: String,
            required: true,
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

export const UsuarioModel = model<Usuario>('Usuario', UsuarioSchema);