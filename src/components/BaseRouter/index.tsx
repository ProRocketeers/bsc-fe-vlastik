import React from "react";
import { Router } from "@reach/router";
import TodoApp from "../Todo";

class ToDos extends React.Component {
  render() {
    return (
      <Router>
        <TodoApp path="/*" />
        <TodoApp path="/todos/*" />
      </Router>
    );
  }
}

export default ToDos;
