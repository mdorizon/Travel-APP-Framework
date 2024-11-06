import { Router } from "express";
import CategoryService from "./category.service";

const CategoryController = Router();

CategoryController.get('/', (req, res) => CategoryService.getAll(req, res))
CategoryController.get('/:id', (req, res) => CategoryService.getOne(req, res))
CategoryController.post('/', (req, res) => CategoryService.create(req, res))
CategoryController.put('/:id', (req, res) => CategoryService.update(req, res))
CategoryController.delete('/:id', (req, res) => CategoryService.remove(req, res))

export default CategoryController;