import express from 'express';
import { validate } from '../middleware/validate';
import { createTodoSchema } from '../validator/todoValidator';
import { createTodo } from '../controllers/todoController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/create', authenticate, validate(createTodoSchema), createTodo);

export default router;
