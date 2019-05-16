import React from "react";
import "./App.css";
import AppRouter from "./components/BaseRouter";
import { Link } from "@reach/router";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <AppRouter />
    </React.Fragment>
  );
};

export default App;
