import express from 'express';
import { validate } from '../middleware/validate';
import { signInSchema, userSchema } from '../validator/userValidator';
import { createUser,signInUser } from '../controllers/userController';

const router = express.Router();

router.post('/signup', validate(userSchema), createUser);
router.post('/signin', validate(signInSchema), signInUser);

export default router;
