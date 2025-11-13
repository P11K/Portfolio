import React, { useRef, useEffect, useState } from "react";
import projects from "../data/project";
import certifications from "../data/sertif.json";
import skills from "../data/skill"; // Import data skills
import "./Home.css";
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

  // Destructure skills data dari JSON
  const { softSkills, softwareSkills, hardSkills } = skills;

  // Data certifications

  // Fungsi untuk membuka modal
  const openImageModal = (imageUrl, title) => {
    console.log("Opening modal with:", imageUrl, title);
    setSelectedImage({ url: imageUrl, title });
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeImageModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Effect untuk ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
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

    const MAX_ROTATION = 10;
    const SMOOTHING = 0.08;
    const MAX_SHADOW = 30;

    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let rafId;

    const update = () => {
      currentX += (targetX - currentX) * SMOOTHING;
      currentY += (targetY - currentY) * SMOOTHING;

      const img = profileElement.querySelector("img");
      if (img) {
        img.style.setProperty("--rotateX", `${currentX}deg`);
        img.style.setProperty("--rotateY", `${currentY}deg`);

        const shadowX = (currentY / MAX_ROTATION) * MAX_SHADOW;
        const shadowY = (currentX / MAX_ROTATION) * MAX_SHADOW;
        img.style.boxShadow = `
          ${-shadowY}px ${shadowX}px 30px rgba(0,0,0,0.15),
          0 0 0 1px rgba(255,255,255,0.7)
        `;
      }

      rafId = requestAnimationFrame(update);
    };

    const handleMove = (e) => {
      const rect = profileElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      targetY = normX * MAX_ROTATION;
      targetX = -normY * MAX_ROTATION;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    profileElement.addEventListener("mousemove", handleMove);
    profileElement.addEventListener("mouseleave", handleLeave);

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      profileElement.removeEventListener("mousemove", handleMove);
      profileElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Tampilkan semua project atau hanya 3 project pertama
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  // Komponen untuk menampilkan rating bintang
  const RatingStars = ({ rating }) => {
    const totalStars = 10;
    return (
      <div className="rating-stars">
        {Array.from({ length: totalStars }, (_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? "filled" : "empty"}`}
          >
            {index < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
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
                e.target.src = "/fallback-image.jpg";
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
          <img src="/Portfolio/img/Profile.png" alt="Profile" />
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
                  : `Show All Projects`}
              </button>
            </div>
          )}
        </div>
      </section>

      <hr className="divider" />

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <h2>My Skills</h2>
          <div className="skills-container">
            {/* Soft Skills */}
            <div className="skill-category soft-skills">
              <h3>Soft Skills</h3>
              <div className="skill-list">
                {softSkills.map((skill, index) => (
                  <div key={index} className="skill-item-rating">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-rating">{skill.rating}/10</span>
                    </div>
                    <RatingStars rating={skill.rating} />
                    <div className="skill-description">
                      {skill.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Skills */}
            <div className="skill-category software-skills">
              <h3>Software Skills</h3>
              <div className="skill-list">
                {softwareSkills.map((skill, index) => (
                  <div key={index} className="skill-item-rating">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-rating">{skill.rating}/10</span>
                    </div>
                    <RatingStars rating={skill.rating} />
                    <div className="skill-description">
                      {skill.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard Skills */}
            <div className="skill-category hard-skills">
              <h3>Hard Skills</h3>
              <div className="skill-list">
                {hardSkills.map((skill, index) => (
                  <div key={index} className="skill-item-rating">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-rating">{skill.rating}/10</span>
                    </div>
                    <RatingStars rating={skill.rating} />
                    <div className="skill-description">
                      {skill.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

     {/* Certifications Section */}
<section className="certifications" id="certifications">
  <div className="container">
    <h2>Certifications</h2>
    <div className={`certifications-grid ${certifications.length % 2 !== 0 ? 'odd-items' : ''}`}>
      {certifications.map((cert, index) => (
        <a
          key={index}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-card"
        >
          <div className="cert-icon">{cert.icon}</div>
          <div className="cert-content">
            <h3>{cert.title}</h3>
            <p className="cert-org">{cert.org}</p>
            <p className="cert-year">{cert.year}</p>
            <p className="cert-desc">{cert.desc}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

      <hr className="divider" />

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-header">
            <h2>Get In Touch</h2>
            <p className="contact-intro">
              I'm always interested in new opportunities and collaborations.
              Whether you have a project in mind or just want to say hello, feel
              free to reach out!
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <a href="mailto:vickoardiansyah86@gmail.com">
                  <div className="contact-icon">
                    <FaEnvelope className="email-icon-svg" />
                  </div>
                  <div className="contact-detail">
                    <h4>Email</h4>
                    <p>vickoardiansyah86@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="contact-card">
                <a
                  href="https://wa.me/6283854254718"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon">
                    <FaPhone className="contact-icon-svg" />
                  </div>
                  <div className="contact-detail">
                    <h4>WhatsApp</h4>
                    <p>+62 838-5425-4718</p>
                  </div>
                </a>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <FaMapMarkerAlt className="contact-icon-svg" />
                </div>
                <div className="contact-detail">
                  <h4>Location</h4>
                  <p>Nganjuk</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3>Follow Me</h3>
              <div className="social-grid">
                <a
                  href="https://github.com/P11K"
                  target="blank"
                  className="social-card"
                >
                  <div className="social-icon">
                    <FaGithub className="social-icon-svg" />
                  </div>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vickoputra"
                  target="blank"
                  className="social-card"
                >
                  <div className="social-icon">
                    <FaLinkedin className="social-icon-svg" />
                  </div>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-card">
                  <div className="social-icon">
                    <FaTwitter className="social-icon-svg" />
                  </div>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://www.instagram.com/pikoo.__"
                  target="blank"
                  className="social-card"
                >
                  <div className="social-icon">
                    <FaInstagram className="social-icon-svg" />
                  </div>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;