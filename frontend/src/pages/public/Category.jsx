import { useCategory } from "@/hooks/useCategory";
import ProjectCard from "@/components/public/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useParams } from "react-router-dom";

// Vista de una categoría
function Category() {
  // Obtiene el id de la categoría de los parametros
  const { id } = useParams();
  // Obtiene datos de la categoría
  const { category, loading: categoryLoading } = useCategory(id);
  // Obtiene datos de los proyectos 
  const { projects, loading, error } = useProjects();

  // Filtra los proyectos para aislar las que pertenecen a la categoría deseada
  const filteredProjects = (projects ?? []).filter((project) => {
    const projectCategoryId = project.category?._id ?? project.category;
    return projectCategoryId === id;
  });

  // Mensajes de carga, error
  if (loading || categoryLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-16">
          {/* Info de la categoría */}
          <h1 className="mb-2 text-5xl font-black tracking-tight sm:text-7xl">
            {category?.name}
          </h1>
          <h2 className="mb-8 text-lg font-light tracking-wide text-gray-400">
            {category?.description}
          </h2>
        </header>

        {/* Renderiza las targetas de los proyectos */}
        <div className="flex flex-col gap-20">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
