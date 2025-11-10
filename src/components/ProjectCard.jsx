import "./ProjectCard.css";

function ProjectCard({ title, description, image, github }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={github} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default ProjectCard;
