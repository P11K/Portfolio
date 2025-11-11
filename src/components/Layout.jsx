import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px", minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
