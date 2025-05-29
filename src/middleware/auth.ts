import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    user?: any;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
    const jwtSecret = process.env.JWT_SECRET as string;

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token missing or invalid' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
}
