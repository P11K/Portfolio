// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ViewCV from "./pages/view"; // ganti dari ViewPDF ke ViewCV

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cv" element={<ViewCV />} />
      </Route>
    </Routes>
  );
}

export default App;
