import { Router } from "express";
import { EspecieController } from "../controllers/Especie.controller";

const especieRouter = Router();

especieRouter.get('/especie', EspecieController.getEspecies);

export default especieRouter;