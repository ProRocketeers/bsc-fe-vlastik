import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cs from "./i18n/cs_i18n";
import en from "./i18n/en_i18n";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      cs: {
        translation: cs,
      },
    },
    lng: "cs",
    fallbackLng: ["en", "cs"],
  });

export default i18n;
