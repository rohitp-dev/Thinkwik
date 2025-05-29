import mongoose, { Schema, Document, Types } from 'mongoose';
import { MODEL } from '../helper/utils';

export interface ITodo extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: MODEL.USER,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodo>(MODEL.TODO, todoSchema);
