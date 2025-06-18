// src/main/header/headerbody.tsx
import React from "react";
import HamburgerButton from "./hamburgerbutton";
import "../customfont.css";

type HeaderProps = {
  onHamburgerClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onHamburgerClick }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <HamburgerButton onClick={onHamburgerClick} />
      </div>
      <div className="text1">TaskFlow</div>
      <div className="header-right">{/* 右側スペース（将来用） */}</div>
    </header>
  );
};

export default Header;
