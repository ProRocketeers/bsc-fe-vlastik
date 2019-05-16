import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { Todo } from "../TodosList";
import { getTodosById } from "../../../api/todos";
import TodoForm, { ITodoForm } from "../TodoForm";

interface TodoSingleProps {
  todos: Todo[];
  onEdit: (todo: ITodoForm) => Promise<Todo>;
}

interface TodoSingleState {
  todo?: Todo;
  isEditing: boolean;
  isLoading: boolean;
  error?: Error;
}

interface DisplayTodoProps {
  todo: Todo;
  onEdit: () => void;
}

const DisplayTodo: React.FC<DisplayTodoProps> = ({ todo, onEdit }) => (
  <div>
    <h1>{todo.title}</h1>
    <h1>{todo.completed ? "Completed" : "NotCompleted"}</h1>
    <button onClick={onEdit}>Edit</button>
  </div>
);

class Index extends React.Component<
  TodoSingleProps & RouteComponentProps<{ todoId: string }>,
  TodoSingleState
> {
  state: TodoSingleState = {
    isEditing: false,
    isLoading: false,
    error: undefined,
  };

  constructor(props: TodoSingleProps) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { todoId } = this.props;

    if (todoId) {
      this.setState({ isLoading: true });
      getTodosById(todoId)
        .then(todo => this.setState({ todo, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  handleEdit() {
    this.setState({
      isEditing: true,
    });
  }

  handleCancel() {
    this.setState({
      isEditing: false,
    });
  }

  submitForm({ id, title, completed, userId }: ITodoForm) {
    this.setState({ isLoading: true });
    if (id) {
      this.props
        .onEdit({ id, userId, title, completed })
        .then(todo =>
          this.setState({ todo, isLoading: false, isEditing: false })
        )
        .catch(error =>
          this.setState({
            error,
            isLoading: false,
            isEditing: false,
          })
        );
    }
  }

  render() {
    const { todo, isEditing, isLoading, error } = this.state;
    if (isLoading) {
      return <div>loading</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (todo) {
      return isEditing ? (
        <TodoForm
          todo={todo}
          onSubmit={this.submitForm}
          onCancel={this.handleCancel}
        />
      ) : (
        <DisplayTodo todo={todo} onEdit={this.handleEdit} />
      );
    }
    return <div>no todo</div>;
  }
}

export default Index;