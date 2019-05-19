import * as React from "react";
import { Navbar, NavbarBrand, DropdownMenu, DropdownItem } from "reactstrap";
import i18next from "i18next";

interface IHeader {
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<IHeader> = ({}) => (
  <Navbar>
    <NavbarBrand>TODO</NavbarBrand>
    <DropdownMenu>
      {i18next.languages.map(lang => (
        <DropdownItem key={lang}>{lang}</DropdownItem>
      ))}
    </DropdownMenu>
  </Navbar>
);

export default Header;
