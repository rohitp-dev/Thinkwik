import { Response } from 'express';
import { createTodoService } from '../services/todoService';
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
