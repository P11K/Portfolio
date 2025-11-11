import React, { useRef, useEffect, useState } from "react";
import projects from "../data/project";
import "./Home.css";
import profilePic from "../assets/img/Profile.png";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

function Home() {
  const profileRef = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug: log projects data saat komponen dimuat
  useEffect(() => {
    console.log("Projects data:", projects);
    projects.forEach((project, index) => {
      console.log(`Project ${index + 1}:`, project.title, "Image:", project.image);
    });
  }, []);

  // Fungsi untuk membuka modal dengan gambar
const openImageModal = (imageUrl, projectTitle) => {
  console.log("Opening modal with:", { imageUrl, projectTitle });
  setSelectedImage({ url: imageUrl, title: projectTitle });
  setIsModalOpen(true);
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open'); // Tambahkan ini
};

  // Fungsi untuk menutup modal
const closeImageModal = () => {
  setIsModalOpen(false);
  setSelectedImage(null);
  document.body.style.overflow = 'unset';
  document.body.classList.remove('modal-open'); // Tambahkan ini
};

  // Fungsi untuk menutup modal dengan ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.keyCode === 27 && isModalOpen) {
        closeImageModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // Effect untuk profile image
  useEffect(() => {
    const profileElement = profileRef.current;
    if (!profileElement) return;

    const MAX_ROTATION = 8;
    const ADJUST_FACTOR = 0.5;

    const handleMouseMove = (e) => {
      const rect = profileElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xCenter = x - rect.width / 2;
      const yCenter = y - rect.height / 2;
      const rotateY =
        (xCenter / (rect.width / 2)) * MAX_ROTATION * ADJUST_FACTOR;
      const rotateX =
        (yCenter / (rect.height / 2)) * MAX_ROTATION * ADJUST_FACTOR * -1;

      const imageElement = profileElement.querySelector("img");
      if (imageElement) {
        imageElement.style.setProperty("--rotateX", `${rotateX}deg`);
        imageElement.style.setProperty("--rotateY", `${rotateY}deg`);
      }
    };

    const handleMouseLeave = () => {
      const imageElement = profileElement.querySelector("img");
      if (imageElement) {
        imageElement.style.transition =
          "transform 0.5s ease-out, box-shadow 0.3s ease";
        imageElement.style.setProperty("--rotateX", "0deg");
        imageElement.style.setProperty("--rotateY", "0deg");
      }
    };

    const handleMouseEnter = () => {
      const imageElement = profileElement.querySelector("img");
      if (imageElement) {
        imageElement.style.transition =
          "box-shadow 0.3s ease, transform 0.05s linear";
      }
    };

    profileElement.addEventListener("mousemove", handleMouseMove);
    profileElement.addEventListener("mouseleave", handleMouseLeave);
    profileElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      profileElement.removeEventListener("mousemove", handleMouseMove);
      profileElement.removeEventListener("mouseleave", handleMouseLeave);
      profileElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Tampilkan semua project atau hanya 3 project pertama
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  return (
    <div className="portfolio-container">
      {/* Modal untuk gambar full size */}
      {isModalOpen && selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>
              <FaTimes />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              onError={(e) => {
                console.error("Error loading image:", selectedImage.url);
                console.error("Image element:", e.target);
                e.target.src = "/fallback-image.jpg"; // Fallback image
              }}
              onLoad={() => console.log("Image loaded successfully:", selectedImage.url)}
            />
            <div className="modal-title">{selectedImage.title}</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="home" id="home">
        <div className="intro">
          <h1>
            Hi, I'm <br />
            <span>Muhammad Vicko Putra Ardiansyah</span>
          </h1>
          <hr className="divider" />
          <p>
            I'm an <b>Informatics Engineering student</b> passionate about{" "}
            <b>Artificial Intelligence</b>, <b>Machine Learning</b>, and{" "}
            <b>Computer Vision</b>. Welcome to my portfolio!
          </p>
          <div className="buttons">
            <a href="#projects" className="btn primary">
              View My Projects
            </a>
            <a href="#contact" className="btn secondary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="profile-img" ref={profileRef}>
          <img src={profilePic} alt="Profile" />
        </div>
      </section>

      <hr className="divider" />

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I am a passionate Informatics Engineering student with a strong
                interest in cutting-edge technologies. My journey in technology
                started when I was fascinated by how machines can learn and
                perceive the world.
              </p>
              <p>
                Currently, I'm specializing in Artificial Intelligence and
                Computer Vision, exploring how we can create intelligent systems
                that can understand and interpret visual data just like humans
                do.
              </p>
              <div className="skills-highlights">
                <div className="skill-item">
                  <h4>AI & ML</h4>
                  <p>Deep Learning, Neural Networks, Predictive Models</p>
                </div>
                <div className="skill-item">
                  <h4>Computer Vision</h4>
                  <p>Image Processing, Object Detection, Pattern Recognition</p>
                </div>
                <div className="skill-item">
                  <h4>Development</h4>
                  <p>Python, JavaScript, React, TensorFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2>My Projects</h2>
          <div className="projects-grid">
            {displayedProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div 
                  className="project-image clickable-image"
                  onClick={() => {
                    console.log("Project data:", project);
                    console.log("Image path:", project.image);
                    openImageModal(project.image, project.title);
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    onError={(e) => {
                      console.error("Error loading project image:", project.image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="image-overlay">
                    <span>Click to view full image</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies &&
                      project.technologies.map((tech, index) => (
                        <span key={index}>{tech}</span>
                      ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn secondary small"
                    >
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn primary small"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {projects.length > 3 && (
            <div className="projects-more">
              <button className="btn primary" onClick={toggleShowAllProjects}>
                {showAllProjects
                  ? "Show Less"
                  : `Show All Projects (${projects.length})`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ... sisa section tetap sama ... */}
    </div>
  );
}

export default Home;