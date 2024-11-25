import { Router } from "express";
import CommentService from "./comment.service";

const CommentController = Router();

CommentController.get('/', (req, res) => CommentService.getAll(req, res))
CommentController.get('/:id', (req, res) => CommentService.getAllForOneTravel(req, res))
CommentController.post('/', (req, res) => CommentService.create(req, res))
CommentController.put('/:id', (req, res) => CommentService.update(req, res))
CommentController.delete('/:id', (req, res) => CommentService.remove(req, res))

export default CommentController;