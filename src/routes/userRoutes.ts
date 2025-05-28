import express from 'express';
import { validate } from '../middleware/validate';
import { userSchema } from '../validator/userValidator';
import { createUser } from '../controllers/userController';

const router = express.Router();

router.post('/signup', validate(userSchema), createUser);

export default router;
