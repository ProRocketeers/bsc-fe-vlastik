import React from "react";
import "./i18n";
import { Container } from "reactstrap";
import Header from "./components/Header";
import i18n from "./i18n";
import { Router } from "@reach/router";
import TodoApp from "./components/Todo";

const App: React.FC = () => {
  return (
    <Container>
      <Header
        onLanguageChange={(lang: string) => {
          i18n.changeLanguage(lang);
        }}
      />
      <Router>
        <TodoApp path="/*" />
        <TodoApp path="/todos/*" />
      </Router>
    </Container>
  );
};

export default App;
