import { useProjects } from "../../hooks/useProjects";
import ProjectCard from "@/components/admin/ProjectCard";

function Projects() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main>
        <h1>Proyectos</h1>

        <ul>
          {projects.map((project) => (
            <li>
              <ProjectCard key={project._id} project={project} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Projects;
