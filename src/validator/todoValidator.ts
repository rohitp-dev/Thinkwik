import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'dueDate must be in DD-MM-YYYY format',
    }),
  completed: Joi.boolean().optional(),
});
