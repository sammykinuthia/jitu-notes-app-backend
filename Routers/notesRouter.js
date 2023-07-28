import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../Controllers/notesController.js";

export const notesRouter = Router()

notesRouter.get('/', getPosts)
notesRouter.get('/:id', getPost)
notesRouter.post('/', createPost)
notesRouter.patch('/:id', updatePost)
notesRouter.delete('/:id', deletePost)