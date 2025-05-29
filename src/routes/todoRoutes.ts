import express from 'express';
import { validate } from '../middleware/validate';
import { createTodoSchema } from '../validator/todoValidator';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todoController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/create', authenticate, validate(createTodoSchema), createTodo);
router.get('/all', authenticate, getAllTodos);
router.get('/:id', authenticate, getTodoById);
router.put('/update/:id', authenticate, validate(createTodoSchema), updateTodo);
router.delete('/delete/:id', authenticate, deleteTodo);

export default router;
