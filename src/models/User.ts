import mongoose, { Document, Schema } from 'mongoose';
import { MODEL } from '../helper/utils';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export const User = mongoose.model<IUser>(MODEL.USER, userSchema);
