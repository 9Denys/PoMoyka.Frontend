import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>PoMoyka</h3>
        <p>We don’t just clean cars — we redefine shine</p>
        <a href="/Auth" className="footer-employers">For employers</a>
      </div>
      <div className="footer-right">
        <h4>Contact info</h4>
        <p>53 Olzhycha Street, Kyiv, 02000</p>
        <p>spomoyka.ua@gmail.com</p>
        <p>+38 066 187 53 60</p>
      </div>
    </footer>
  );
}

export default Footer;