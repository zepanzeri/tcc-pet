import { Router } from "express";
import { PetController } from "../controllers/Pet.controller";

const petRouter = Router();

petRouter.get('/pet', PetController.getPets);

export default petRouter;