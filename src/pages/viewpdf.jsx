import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ wajib untuk navigasi tanpa reload
import "./viewpdf.css";

const ViewCV = () => {
  const [scale, setScale] = useState(1);

  // ✅ Gunakan BASE_URL agar aman di GitHub Pages dan localhost
  const imageUrl = import.meta.env.DEV
    ? "/Portfolio/img/CV-Baru.jpg" // di dev, file ini ada di /public/img/
    : `${import.meta.env.BASE_URL}img/CV-Baru.jpg`; // di build/deploy

  return (
    <div className="cv-page">
      {/* ==== Bagian Tombol Kontrol ==== */}
      <div className="cv-controls">
        <Link to="/" className="back-btn">← Kembali</Link>

        <div className="controls-right">
          <button
            onClick={() => setScale((s) => Math.max(0.5, +(s - 0.2).toFixed(1)))}
            className="ctrl"
          >
            −
          </button>
          <span className="ctrl-label">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((s) => Math.min(3, +(s + 0.2).toFixed(1)))}
            className="ctrl"
          >
            +
          </button>
        </div>
      </div>

      {/* ==== Gambar CV ==== */}
      <div className="cv-viewer-container">
        <img
          src={imageUrl}
          alt="CV Preview"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.25s ease",
            width: "100%",
            maxWidth: "900px",
            borderRadius: "10px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          }}
          onError={(e) => {
            e.target.src = "/img/not-found.jpg"; // fallback opsional
            e.target.alt = "Gambar CV tidak ditemukan";
          }}
        />
      </div>
    </div>
  );
};

export default ViewCV;
