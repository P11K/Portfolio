import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Update activeSection berdasarkan scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "certifications", "contact"];
      const scrollPos = window.scrollY + 100; // offset sedikit

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
      <a href="#home" className="logo" onClick={closeMenu}>
        Portfolio<span className="dot">.</span>
      </a>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li className={activeSection === "about" ? "active" : ""}>
          <a href="#about" onClick={closeMenu}>About</a>
        </li>
        <li className={activeSection === "projects" ? "active" : ""}>
          <a href="#projects" onClick={closeMenu}>Projects</a>
        </li>
        <li className={activeSection === "skills" ? "active" : ""}>
          <a href="#skills" onClick={closeMenu}>Skills</a>
        </li>
        <li className={activeSection === "certifications" ? "active" : ""}>
          <a href="#certifications" onClick={closeMenu}>Certifications</a>
        </li>
        <li className={activeSection === "contact" ? "active" : ""}>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
