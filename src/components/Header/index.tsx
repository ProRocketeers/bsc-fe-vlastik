import * as React from "react";
import { Navbar, NavbarBrand, Input, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

interface IHeader {
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<IHeader> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Col>
          <NavbarBrand href="/">{t("brand")}</NavbarBrand>
        </Col>
        <Col xs="3">
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
    </div>
  );
};

export default Header;
