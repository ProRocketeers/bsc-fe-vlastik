import * as React from "react";
import * as R from "ramda";
import { Router, RouteComponentProps } from "@reach/router";
import TodoSingle from "./TodoSingle";
import TodosList, { Todo } from "./TodosList";
import { getAllTodos, putTodo, postTodo, deleteTodo } from "../../api/todos";
import NewTodo from "./NewTodo";
import { ITodoForm } from "./TodoForm";
import { Container } from "reactstrap";

interface TodosState {
  todos: Todo[];
  error?: Error;
}

export default class TodoApp extends React.Component<
  RouteComponentProps,
  TodosState
> {
  state: TodosState = {
    todos: [],
  };

  constructor(props: RouteComponentProps) {
    super(props);
    this.fetchTodoList = this.fetchTodoList.bind(this);
    this.onSubmitTodoForm = this.onSubmitTodoForm.bind(this);
    this.onSubmitNewForm = this.onSubmitNewForm.bind(this);
    this.onDeleteTodo = this.onDeleteTodo.bind(this);
  }

  componentDidMount() {
    this.fetchTodoList();
  }

  fetchTodoList() {
    getAllTodos()
      .then(todos => {
        this.setState({ todos });
      })
      .catch(error => this.setState({ error }));
  }

  onSubmitTodoForm({ id, completed, title, userId }: ITodoForm) {
    if (id !== undefined) {
      return putTodo({
        id,
        completed,
        title,
        userId,
      }).then(todo => {
        const patchedTodoList = this.state.todos.map(oldTodos => {
          if (oldTodos.id === todo.id) {
            return todo;
          } else {
            return oldTodos;
          }
        });
        this.setState({
          todos: patchedTodoList,
        });
        return todo;
      });
    } else {
      return postTodo({
        title,
        userId,
        completed,
      }).then(todo => {
        this.setState({ todos: R.concat([todo], this.state.todos) });
        return todo;
      });
    }
  }

  onSubmitNewForm(todo: ITodoForm) {
    return this.onSubmitTodoForm(todo).then(todo => {
      if (this.props.navigate) {
        this.props.navigate("/todos");
      }
      return todo;
    });
  }

  onDeleteTodo(todo: Todo) {
    deleteTodo(todo.id.toString())
      .then(() => {
        const withoutRemovedTodo = R.reject(R.propEq("id", todo.id))(
          this.state.todos
        );
        this.setState({
          todos: withoutRemovedTodo,
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <Container>
        <Router>
          <TodoSingle
            path=":todoId"
            todos={this.state.todos}
            onEdit={this.onSubmitTodoForm}
          />
          <TodoSingle
            path=":todoId/edit"
            todos={this.state.todos}
            onEdit={this.onSubmitTodoForm}
            defaultEditState={true}
          />
          <NewTodo path="/new" onSubmit={this.onSubmitNewForm} />
          <TodosList
            path="/"
            todos={this.state.todos}
            onDelete={this.onDeleteTodo}
            onChecked={this.onSubmitTodoForm}
          />
        </Router>
      </Container>
    );
  }
}
