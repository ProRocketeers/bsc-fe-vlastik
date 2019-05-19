import React, { useState } from "react";
import "./App.css";
import AppRouter from "./components/BaseRouter";
import { Link } from "@reach/router";
import Header from "./components/Header";
import "./i18n";
import i18next from "i18next";

const App: React.FC = () => {
  const [lang, setLang] = useState("en");
  return (
    <React.Fragment>
      <Header
        onLanguageChange={(language: string) =>
          i18next.changeLanguage(language, () => setLang(lang))
        }
      />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <AppRouter />
    </React.Fragment>
  );
};

export default App;
