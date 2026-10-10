import { Link } from "react-router-dom";

// Tarjeta para la miniatura del proyecto que aparece en la página inical 
function ProjectThumbnail({ category }) {
  return (
    // Abre una categoría específica
    <Link
      to={`/category/${category._id}`}
      className="relative block aspect-square overflow-hidden transition-transform duration-300 hover:z-10 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
    >
      <img
        src={category.thumbnail.url}
        alt={category.name}
        className="h-full w-full object-cover"
      />

      <p>{category.name}</p>
    </Link>
  );
}

export default ProjectThumbnail;
