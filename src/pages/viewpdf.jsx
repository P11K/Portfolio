import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./viewpdf.css";

const ViewCV = () => {
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State untuk drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const imageUrl = import.meta.env.DEV
    ? "/Portfolio/img/CV-Baru.jpg"
    : `${import.meta.env.BASE_URL}img/CV-Baru.jpg`;

  const googleDriveLink = "https://drive.google.com/uc?export=download&id=15xTkEGCx8OGTs1LCWfdWMkNzN1hcS7at";

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
      
      setTimeout(() => {
        window.open(googleDriveLink, '_blank');
      }, 1000);
      
    } catch (error) {
      console.error('Download error:', error);
      window.open(googleDriveLink, '_blank');
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // ✅ Effect untuk handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Drag functionality dengan useCallback untuk performance
  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return;
    
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    if (imageRef.current) {
      imageRef.current.style.cursor = 'grabbing';
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || scale <= 1) return;
    
    e.preventDefault();
    
    const newX = e.clientX - startPosition.x;
    const newY = e.clientY - startPosition.y;
    
    // Batasi pergerakan agar tidak terlalu jauh
    const maxMove = 500 * scale;
    const constrainedX = Math.max(Math.min(newX, maxMove), -maxMove);
    const constrainedY = Math.max(Math.min(newY, maxMove), -maxMove);
    
    setPosition({
      x: constrainedX,
      y: constrainedY
    });
  }, [isDragging, scale, startPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    if (imageRef.current) {
      imageRef.current.style.cursor = scale > 1 ? 'grab' : 'default';
    }
  }, [scale]);

  // ✅ Touch events untuk mobile
  const handleTouchStart = useCallback((e) => {
    if (scale <= 1) return;
    
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPosition({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  }, [scale, position]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || scale <= 1) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newX = touch.clientX - startPosition.x;
    const newY = touch.clientY - startPosition.y;
    
    // Batasi pergerakan
    const maxMove = 500 * scale;
    const constrainedX = Math.max(Math.min(newX, maxMove), -maxMove);
    const constrainedY = Math.max(Math.min(newY, maxMove), -maxMove);
    
    setPosition({
      x: constrainedX,
      y: constrainedY
    });
  }, [isDragging, scale, startPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ✅ Reset position ketika zoom berubah
  useEffect(() => {
    if (scale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
    
    // Update cursor berdasarkan scale
    if (imageRef.current) {
      imageRef.current.style.cursor = scale > 1 ? 'grab' : 'default';
    }
  }, [scale]);

  // ✅ Event listeners untuk global mouse up (handle case ketika mouse keluar dari element)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="cv-page">
      <div className={`cv-controls ${isScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="back-btn">← Back to Portfolio</Link>

        <div className="controls-center">
          <button
            onClick={() => setScale((s) => Math.max(0.3, +(s - 0.2).toFixed(1)))}
            className="ctrl zoom-out"
            disabled={scale <= 0.3}
            title="Zoom Out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13H5v-2h14v2z"/>
    </svg>
          </button>
          <button 
            onClick={handleResetZoom}
            className="ctrl reset-zoom"
            title="Reset Zoom"
          >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
          </button>
          <span className="ctrl-label">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((s) => Math.min(3, +(s + 0.2).toFixed(1)))}
            className="ctrl zoom-in"
            disabled={scale >= 3}
            title="Zoom In"
          >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
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

      <div className="cv-viewer-container" ref={containerRef}>
        <div className="cv-image-wrapper">
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Muhammad Vicko Putra Ardiansyah - Curriculum Vitae"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: "center center",
            }}
            className={`cv-image ${scale > 1 ? 'zoom-active' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onError={(e) => {
              e.target.src = "/img/not-found.jpg";
              e.target.alt = "CV image not found";
            }}
            draggable="false"
          />
        </div>
      </div>

      <div className="zoom-instructions">
        <p>
          {scale > 1 
            ? "Use +/- buttons to zoom • Click and drag to pan • Scroll to navigate • Click download for PDF version"
            : "Use +/- buttons to zoom • Scroll to navigate • Click download for PDF version"
          }
        </p>
      </div>
    </div>
  );
};

export default ViewCV;