import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => {
        const field = detail.context?.label || detail.context?.key;
        return `${field} is ${detail.type.includes('required') ? 'required' : detail.message}`;
      });
      res.status(400).json({ message: messages });
      return;
    }
    next();
  };
