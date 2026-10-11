import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "@/components/admin/ProjectCard";

// Carga prooyectos
function Projects() {
  const { projects, loading, error } = useProjects();

  // Maneja carga/error
  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main>
        <h1>Proyectos</h1>

        {/* Carga todas las tarjetas de proyectos actuales */}
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
