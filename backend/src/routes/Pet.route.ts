import { Router } from "express";
import { PetController } from "../controllers/Pet.controller";
import { upload } from "../middlewares/Upload";

const petRouter = Router();

petRouter.get('/pet', PetController.getPets);
petRouter.get('/pet/usuario', PetController.getPetsUsuario);
petRouter.post('/pet/cadastrar', upload.array('imagens', 5), PetController.cadastraPet);

export default petRouter;