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
    document.body.classList.add('modal-open');
  };

  // Fungsi untuk menutup modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
    document.body.classList.remove('modal-open');
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
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-list">
                <div className="skill">
                  <span>Problem Solving</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Teamwork</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Adaptability</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Continuous Learning</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Skills - Dipindahkan ke tengah */}
            <div className="skill-category software-skills">
              <h3>Software Skills</h3>
              <div className="skill-list">
                <div className="skill">
                  <span>Visual Studio Code</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Microsoft Office</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>XAMPP</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hard Skills */}
            <div className="skill-category">
              <h3>Hard Skills</h3>
              <div className="skill-list">
                <div className="skill">
                  <span>HTML</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>JavaScript</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Python</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>PHP</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Git</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>Computer Vision</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="skill">
                  <span>PyTorch</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: "82%" }}></div>
                  </div>
                </div>
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
          <div className="certifications-grid">
            <a
              href="https://drive.google.com/file/d/1JHrog-9J0kqt_k1uw7NC4OMuHQHSk3-A/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
            >
              <div className="cert-icon">🏆</div>
              <div className="cert-content">
                <h3>Microsoft Office Applied</h3>
                <p className="cert-org">Trust Training Partners</p>
                <p className="cert-year">2025</p>
                <p className="cert-desc">Word, PowerPoint, Excel</p>
              </div>
            </a>

            <a
              href="https://drive.google.com/file/d/142goCJfx5MWfi_nDnQ-rxHDZoqFgAlAf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
            >
              <div className="cert-icon">🌍</div>
              <div className="cert-content">
                <h3>Test Of English as A Foreign Language (TOEFL)</h3>
                <p className="cert-org">Royal English</p>
                <p className="cert-year">2025</p>
                <p className="cert-desc">Score: 550</p>
              </div>
            </a>
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