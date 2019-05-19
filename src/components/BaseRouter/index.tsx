import React from "react";
import { Router } from "@reach/router";
import Home from "../Home";
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
