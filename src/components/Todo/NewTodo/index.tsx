import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import TodoForm, { ITodoForm } from "../TodoForm";
import { Todo } from "../TodosList";
import Loading from "../../Loading";

interface INewTodo {
  onSubmit: (todo: ITodoForm) => Promise<Todo>;
}

interface NewTodoState {
  isLoading: boolean;
  error?: Error;
}

class NewTodo extends React.Component<
  INewTodo & RouteComponentProps,
  NewTodoState
> {
  state: NewTodoState = {
    isLoading: false,
  };

  onSubmit = (todo: ITodoForm) => {
    this.setState({ isLoading: true });
    this.props.onSubmit(todo).then(todo => {
      this.setState({ isLoading: false });
    });
  };

  onCancel = () => {
    if (this.props.navigate) {
      this.props.navigate("/todos");
    }
  };

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <TodoForm onSubmit={this.onSubmit} onCancel={this.onCancel} />
    );
  }
}

export default NewTodo;
