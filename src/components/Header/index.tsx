import * as React from "react";
import { Navbar, NavbarBrand, Input, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

interface IHeader {
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<IHeader> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  return (
    <Navbar color="light" light>
      <Col>
        <NavbarBrand href="/">{t("brand")}</NavbarBrand>
      </Col>
      <Col lg={2}>
        <Input
          type="select"
          onChange={event => {
            onLanguageChange(event.target.value);
          }}
          right="true"
        >
          {i18n.languages.map(lang => (
            <option key={lang}>{lang}</option>
          ))}
        </Input>
      </Col>
    </Navbar>
  );
};

export default Header;
