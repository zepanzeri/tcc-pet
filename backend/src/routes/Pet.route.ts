import { Router } from "express";
import { PetController } from "../controllers/Pet.controller";

const petRouter = Router();

petRouter.get('/pet', PetController.getPets);
petRouter.get('/pet/usuario', PetController.getPetsUsuario);

export default petRouter;