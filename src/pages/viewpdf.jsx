import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./viewpdf.css";

const ViewCV = () => {
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // ✅ Gunakan BASE_URL agar aman di GitHub Pages dan localhost
  const imageUrl = import.meta.env.DEV
    ? "/Portfolio/img/CV-Baru.jpg"
    : `${import.meta.env.BASE_URL}img/CV-Baru.jpg`;

  // ✅ Google Drive PDF link untuk download
  const googleDriveLink = "https://drive.google.com/uc?export=download&id=15xTkEGCx8OGTs1LCWfdWMkNzN1hcS7at";

  // ✅ Fungsi untuk download CV
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = googleDriveLink;
      link.download = 'CV_Muhammad_Vicko_Putra_Ardiansyah.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: Jika download tidak bekerja, buka di tab baru
      setTimeout(() => {
        window.open(googleDriveLink, '_blank');
      }, 1000);
      
    } catch (error) {
      console.error('Download error:', error);
      // Fallback langsung buka tab baru
      window.open(googleDriveLink, '_blank');
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  // ✅ Reset zoom
  const handleResetZoom = () => {
    setScale(1);
  };

  return (
    <div className="cv-page">
      {/* ==== Bagian Tombol Kontrol ==== */}
      <div className="cv-controls">
        <Link to="/" className="back-btn">← Back to Portfolio</Link>

        <div className="controls-center">
          <button
            onClick={() => setScale((s) => Math.max(0.3, +(s - 0.2).toFixed(1)))}
            className="ctrl zoom-out"
            disabled={scale <= 0.3}
            title="Zoom Out"
          >
            −
          </button>
          <button 
            onClick={handleResetZoom}
            className="ctrl reset-zoom"
            title="Reset Zoom"
          >
            ↺
          </button>
          <span className="ctrl-label">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((s) => Math.min(3, +(s + 0.2).toFixed(1)))}
            className="ctrl zoom-in"
            disabled={scale >= 3}
            title="Zoom In"
          >
            +
          </button>
        </div>

        <div className="controls-right">
          <button 
            onClick={handleDownload}
            className="download-btn"
            disabled={isDownloading}
            title="Download PDF Version"
          >
            {isDownloading ? '⏳ Downloading...' : '📥 Download PDF'}
          </button>
        </div>
      </div>

      {/* ==== Gambar CV ==== */}
      <div className="cv-viewer-container">
        <div className="cv-image-wrapper">
          <img
            src={imageUrl}
            alt="Muhammad Vicko Putra Ardiansyah - Curriculum Vitae"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
            className="cv-image"
            onError={(e) => {
              e.target.src = "/img/not-found.jpg";
              e.target.alt = "CV image not found";
            }}
          />
        </div>
      </div>

      {/* ==== Zoom Instructions ==== */}
      <div className="zoom-instructions">
        <p>Use +/- buttons to zoom • Scroll to navigate • Click download for PDF version</p>
      </div>
    </div>
  );
};

export default ViewCV;