import { Router } from "express";
import TravelService from "./travel.service";

const TravelController = Router();

TravelController.get('/', (req, res) => TravelService.getAll(req, res))
TravelController.get('/:id', (req, res) => TravelService.getOne(req, res))
TravelController.post('/', (req, res) => TravelService.create(req, res))
TravelController.put('/:id', (req, res) => TravelService.update(req, res))
TravelController.delete('/:id', (req, res) => TravelService.remove(req, res))

export default TravelController;