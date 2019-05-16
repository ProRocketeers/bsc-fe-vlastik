import React from "react";
import { Router } from "@reach/router";
import Home from "../Home";
import TodoApp from "../Todo";

class ToDos extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <TodoApp path="todos/*" />
      </Router>
    );
  }
}

export default ToDos;
