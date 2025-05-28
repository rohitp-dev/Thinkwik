import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUserService } from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json({ 
      data:{user},
      message: 'User Created Sucessfully!',
      status: StatusCodes.CREATED });
  } catch (error: any) {
    res.status(error.status || StatusCodes.BAD_REQUEST).json({ message: error.message || 'Something went wrong',status: error.status || StatusCodes.BAD_REQUEST });
  }
}