import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; // ✅ Import HashLink
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "certifications", "contact"];
      const scrollPos = window.scrollY + 100;

      for (let id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo tetap pakai HashLink agar smooth scroll */}
      <HashLink smooth to="/#home" className="logo" onClick={closeMenu}>
        Portfolio<span className="dot">.</span>
      </HashLink>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li className={activeSection === "about" ? "active" : ""}>
          <HashLink smooth to="/#about" onClick={closeMenu}>About</HashLink>
        </li>
        <li className={activeSection === "projects" ? "active" : ""}>
          <HashLink smooth to="/#projects" onClick={closeMenu}>Projects</HashLink>
        </li>
        <li className={activeSection === "skills" ? "active" : ""}>
          <HashLink smooth to="/#skills" onClick={closeMenu}>Skills</HashLink>
        </li>
        <li className={activeSection === "certifications" ? "active" : ""}>
          <HashLink smooth to="/#certifications" onClick={closeMenu}>Certifications</HashLink>
        </li>
        <li className={activeSection === "contact" ? "active" : ""}>
          <HashLink smooth to="/#contact" onClick={closeMenu}>Contact</HashLink>
        </li>

        {/* Tombol View CV tetap route react-router */}
        <li>
          <Link to="/cv" className="view-cv-btn" onClick={closeMenu}>
            View CV
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
