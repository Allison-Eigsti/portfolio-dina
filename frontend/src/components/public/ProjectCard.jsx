import { Link } from "react-router-dom";

// Tarjeta para un proyecto desde la página de la categoría específica
function ProjectCard({ project }) {
  return (
    // Enlace al view del proyecto completo
    <Link
      to={`/project/${project._id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
    >
      {/* Miniatura y título, información basica del proyecto */}
      <div className="aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
        <img
          src={project.thumbnail?.url}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </div>

      <div className="flex justify-between">
        <p className="mt-3 text-s font-medium uppercase tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-gray-900">
          {project.client}
        </p>
        <p className="mt-3 text-s font-medium uppercase tracking-wide text-gray-400 transition-colors duration-300 group-hover:text-gray-900">
          {project.year}
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
