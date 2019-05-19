import * as React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { Table, Button, Input } from "reactstrap";

import { useTranslation } from "react-i18next";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosProps {
  todos: Todo[];
}

const TodoListLine: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        <Input type="checkbox" defaultChecked={todo.completed} />
      </td>
      <td>
        <Link to={todo.id.toString()}>{todo.title}</Link>
      </td>
      <td>
        <Button
          className="floating-right"
          size="sm"
          color="danger"
          onClick={() => console.log("delete", todo.id)}
        >
          {t("delete")}
        </Button>
      </td>
    </tr>
  );
};

const TodoList: React.FC<RouteComponentProps<TodosProps>> = ({
  todos,
  navigate,
}) => {
  const { t } = useTranslation();
  return (
    <Table>
      <thead>
        <tr>
          <th colSpan={3}>{t("new_todo")}</th>
          <th>
            <Button
              color="primary"
              size="sm"
              className="floating-right"
              onClick={() => {
                navigate && navigate("/todos/new");
              }}
            >
              {t("new")}
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {todos && todos.map(todo => <TodoListLine key={todo.id} todo={todo} />)}
      </tbody>
    </Table>
  );
};

export default TodoList;
