import * as React from "react";
import { Link, RouteComponentProps, NavigateFn } from "@reach/router";
import { Table, Button, Input } from "reactstrap";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

type onDeleteFN = (todo: Todo) => void;
type onCheckedFN = (todo: Todo) => Promise<Todo | undefined>;

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ITodoListLine {
  todo: Todo;
  onDelete: onDeleteFN;
  onChecked: onCheckedFN;
}

const TodoListLine: React.FC<ITodoListLine> = ({
  todo,
  onDelete,
  onChecked,
}) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        <Input
          type="checkbox"
          defaultChecked={todo.completed}
          onChange={event => {
            onChecked({ ...todo, completed: event.target.checked });
          }}
        />
      </td>
      <td>
        <Link to={todo.id.toString()}>{todo.title}</Link>
      </td>
      <td>
        <Link to={`/${todo.id}/edit`}>
          <Button className="floating-right" size="sm" color="warning">
            {t("edit_todo")}
          </Button>
        </Link>
      </td>
      <td>
        <Button
          className="floating-right"
          size="sm"
          color="danger"
          onClick={() => onDelete(todo)}
        >
          {t("delete")}
        </Button>
      </td>
    </tr>
  );
};

interface TableHead {
  navigate: NavigateFn;
  t: i18next.TFunction;
}

const TableHead: React.FC<TableHead> = ({ t, navigate }) => (
  <thead>
    <tr>
      <th colSpan={4}>{t("new_todo")}</th>
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
);

interface ITableBody {
  todos: Todo[];
  onDelete: onDeleteFN;
  onChecked: onCheckedFN;
}

const TableBody: React.FC<ITableBody> = ({ todos, onDelete, onChecked }) => (
  <tbody>
    {todos.map(todo => (
      <TodoListLine
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onChecked={onChecked}
      />
    ))}
  </tbody>
);

export interface TodosProps {
  todos: Todo[];
  onDelete: onDeleteFN;
  onChecked: onCheckedFN;
}
const TodoList: React.FC<RouteComponentProps & TodosProps> = ({
  todos,
  navigate,
  onDelete,
  onChecked,
}) => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHead t={t} navigate={navigate || console.log} />
      <TableBody todos={todos} onDelete={onDelete} onChecked={onChecked} />
    </Table>
  );
};

export default TodoList;
