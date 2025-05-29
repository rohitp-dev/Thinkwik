import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export async function createUserService(data: CreateUserDTO) {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    throw error;
  }
}

interface SignInDTO {
  email: string;
  password: string;
}

export async function signInUserService(data: SignInDTO) {
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;

    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
}