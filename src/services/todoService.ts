import moment from "moment";
import { Todo } from "../models/Todo";
import { getUserByUserId } from "./userService";

interface createTodoDTO {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

export async function createTodoService(data: createTodoDTO, userId: string) {
    try {
        await getUserByUserId(userId);
        const todo = await Todo.create({ ...data, dueDate: moment(data.dueDate, 'DD-MM-YYYY', true), user: userId });
        const savedTodo = todo.toObject();
        return {
            ...savedTodo,
            dueDate: moment(savedTodo.dueDate).format('DD-MM-YYYY')
        };
    } catch (error) {
        throw error;
    }
}

export async function getAllTodosService(userId: string) {
    try {
        await getUserByUserId(userId);
        const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
        return todos.map(todo => ({
            ...todo.toObject(),
            dueDate: moment(todo.dueDate).format('DD-MM-YYYY')
        }));
    } catch (error) {
        throw error;
    }
}
export async function deleteTodoService(todoId: string, userId: string) {
    try {
        await getUserByUserId(userId);
        const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
        if (!todo) {
            throw { status: 404, message: 'Todo not found' };
        }
    } catch (error) {
        throw error;
    }
}
export async function updateTodoService(todoId: string, data: Partial<createTodoDTO>, userId: string) {
    try {
        await getUserByUserId(userId);
        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, user: userId },
            { ...data, dueDate: moment(data.dueDate, 'DD-MM-YYYY', true) },
            { new: true }
        );
        if (!todo) {
            throw { status: 404, message: 'Todo not found' };
        }
        const updatedTodo = todo.toObject();
        return {
            ...updatedTodo,
            dueDate: moment(updatedTodo.dueDate).format('DD-MM-YYYY')
        };
    } catch (error) {
        throw error;
    }
}
export async function getTodoByIdService(todoId: string, userId: string) {
    try {
        await getUserByUserId(userId);
        const todo = await Todo.findOne({ _id: todoId, user: userId });
        if (!todo) {
            throw { status: 404, message: 'Todo not found' };
        }
        const todoObject = todo.toObject();
        return {
            ...todoObject,
            dueDate: moment(todoObject.dueDate).format('DD-MM-YYYY')
        };
    } catch (error) {
        throw error;
    }
}