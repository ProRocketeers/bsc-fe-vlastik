import * as React from "react";
import { Link, RouteComponentProps } from "@reach/router";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosProps {
  todos: Todo[];
}

const TodoListLine: React.FC<{ todo: Todo }> = ({ todo }) => (
  <div>
    <Link to={todo.id.toString()}>
      <h3>{todo.title}</h3>
    </Link>
  </div>
);

const TodoList: React.FC<RouteComponentProps<TodosProps>> = ({ todos }) => (
  <React.Fragment>
    {todos && todos.map(todo => <TodoListLine key={todo.id} todo={todo} />)}
  </React.Fragment>
);

export default TodoList;
