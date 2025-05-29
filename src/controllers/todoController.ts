import { Response } from 'express';
import { createTodoService, deleteTodoService, getAllTodosService, getTodoByIdService, updateTodoService } from '../services/todoService';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../middleware/auth';


export async function createTodo(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.userId;
        const todo = await createTodoService(req.body, userId);
        res.status(StatusCodes.CREATED).json({
            data: { todo },
            message: 'Todo created successfully',
            status: StatusCodes.CREATED,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.INTERNAL_SERVER_ERROR });
    }
}

export async function getAllTodos(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.userId;
        const todos = await getAllTodosService(userId);
        res.status(StatusCodes.OK).json({
            data: { todos },
            message: 'Todos fetched successfully',
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.INTERNAL_SERVER_ERROR });
    }
}


export async function deleteTodo(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        await deleteTodoService(todoId, userId);
        res.status(StatusCodes.OK).json({
            message: 'Todo deleted successfully',
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.INTERNAL_SERVER_ERROR });
    }
}

export async function updateTodo(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        const updatedTodo = await updateTodoService(todoId, req.body, userId);
        res.status(StatusCodes.OK).json({
            data: { todo: updatedTodo },
            message: 'Todo updated successfully',
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.INTERNAL_SERVER_ERROR });
    }
}

export async function getTodoById(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.userId;
        const todoId = req.params.id;
        const todo = await getTodoByIdService(todoId, userId);
        res.status(StatusCodes.OK).json({
            data: { todo },
            message: 'Todo fetched successfully',
            status: StatusCodes.OK,
        });
    } catch (error: any) {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.INTERNAL_SERVER_ERROR });
    }
}