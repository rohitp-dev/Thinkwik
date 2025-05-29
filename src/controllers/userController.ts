import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUserService, signInUserService } from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json({
      data: { user },
      message: 'User Created Sucessfully!',
      status: StatusCodes.CREATED
    });
  } catch (error: any) {
    res.status(error.status || StatusCodes.BAD_REQUEST).json({ message: error.message || 'Something went wrong', status: error.status || StatusCodes.BAD_REQUEST });
  }
}


export async function signInUser(req: Request, res: Response) {
  try {
    const { user, token } = await signInUserService(req.body);
    res.status(StatusCodes.OK).json({
      data: { user, token },
      message: 'User Signed In Successfully',
      status: StatusCodes.OK
    });
  } catch (error: any) {
    res.status(error.status || StatusCodes.UNAUTHORIZED).json({ message: error.message || 'Authentication failed', status: error.status || StatusCodes.UNAUTHORIZED });
  }
}