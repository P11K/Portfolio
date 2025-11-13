import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ViewPDF from "./pages/viewpdf"; // <--- ganti nama import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cv" element={<ViewPDF />} /> {/* <--- tambahkan route ini */}
      </Route>
    </Routes>
  );
}

export default App;
