import React, { useState } from "react";
import "./App.css";
import AppRouter from "./components/BaseRouter";
import { Link } from "@reach/router";
import Header from "./components/Header";
import "./i18n";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const [lang, setLang] = useState("en");
  const {t, i18n} = useTranslation()
  return (
    <React.Fragment>
      <Header
        onLanguageChange={(lang: string) =>{
          i18n.changeLanguage(lang)
        }}
      />
      <AppRouter />
    </React.Fragment>
  );
};

export default App;
