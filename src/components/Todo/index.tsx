import * as React from "react"
import { Router, Link, RouteComponentProps } from "@reach/router"
import axios from "axios";

let Home: React.FC<RouteComponentProps> = () => (
  <div>
  </div>
)

interface Todos {
  userId: number
  id: number
  title: string
  completed: true
}

interface TodosState {
  todos: Todos[]
}

interface TodoSingleProps {
  todoId: string
  todos: Todos[]
}

interface TodosSingleState {
  todo?: Todos
}

class Todos extends React.Component<RouteComponentProps<TodosState>>{
  render() {
    return (
      <div>
        {this.props.todos && this.props.todos.map((todo) => (
          <div key={todo.id}>
            <Link to={todo.id.toString()}>
              <h3>{todo.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

class TodoSingle extends React.Component<RouteComponentProps<TodoSingleProps>, TodosSingleState>{
  state: TodosSingleState = {
  }

  componentDidMount() {
    const { todos, todoId } = this.props
    if (todos && todoId) {
      const todo = todos.find(({ id }) => id === parseInt(todoId, 10))
      todo && this.setState({ todo })
    }
  }

  render() {
    const {todo} = this.state
    return (
      <React.Fragment>
        {todo && <div>
          <h1>{todo.title}</h1>
          <h1>{todo.completed? "Completed": "NotCompleted"}</h1>
        </div>}
      </React.Fragment>
    )
  }
}


class TodosRoot extends React.Component<RouteComponentProps, TodosState> {
  state: TodosState = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(({ data }) => {
      this.setState({
        todos: data
      })
    })
  }

  render() {
    return (
      <div>
        <Router>
          <TodoSingle path=":todoId" todos={this.state.todos} />
          <Todos path="/" todos={this.state.todos} />
        </Router>
      </div>
    )
  }
}

class ToDos extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <TodosRoot path="todos/*" />
      </Router>
    )
  }
}

export default ToDos;
