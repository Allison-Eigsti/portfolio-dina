import { Link } from "react-router-dom";
import { Button } from "@/components/admin/Button";

function ProjectCard({ project }) {
  function handleDelete(id) {
    console.log("delete");
  }

  return (
    <>
      <article className="group h-[300px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md">
        <div className="overflow-hidden">
          <img
            src={project.thumbnail.url}
            alt={project.title}
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="p-5">
          <h2 className="text-base font-semibold tracking-tight text-gray-900">
            {project.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
            {project.projectBriefing}
          </p>
        </div>
      </article>
    </>
  );
}

export default ProjectCard;
