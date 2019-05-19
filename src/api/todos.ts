import axios from "axios";
import { Todo } from "../components/Todo/TodosList";
import { ITodoForm } from "../components/Todo/TodoForm";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getAllTodos = () =>
  api.get<Todo[]>("/todos").then(({ data }) => data);

export const getTodosById = (id: string) =>
  api.get<Todo>(`/todos/${id}`).then(({ data }) => data);

export const putTodo = (todo: Todo) =>
  api.put<Todo>(`/todos/${todo.id}`, todo).then(({ data }) => data);

export const postTodo = (todo: ITodoForm) =>
  api.post<Todo>(`/todos`, todo).then(({ data }) => data);

export const deleteTodo = (id: string) => api.delete(`/todos/${id}`);
