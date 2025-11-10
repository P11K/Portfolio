import ProjectCard from "../components/ProjectCard";
import projects from "../data/project";

function Projects() {
  return (
    <section>
      <h1>My Projects</h1>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "20px", 
        marginTop: "20px" 
      }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
