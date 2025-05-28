import { User } from '../models/User';
import bcrypt from 'bcrypt';

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