import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <a href="/Services" className="header-link">Services</a>
        <a href="/" className="header-link">About us</a>
        <a href="/Locations" className="header-link">Locations</a>
      </nav>
    </header>
  );
}

export default Header;