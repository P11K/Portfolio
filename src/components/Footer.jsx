import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Piko. Thanks for stopping by.</p>
    </footer>
  );
}

export default Footer;
