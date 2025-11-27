import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usuarioRouter from './routes/Usuario.route';

dotenv.config();

const app: Application = express();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://mongodb:27017/tcc-pet';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado ao Mongo'))
  .catch((error) => {
    console.error('Erro ao conectar com Mongo:', error);
    process.exit(1);
  });

app.get('/status', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado' 
  });
});

app.use(usuarioRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});