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
