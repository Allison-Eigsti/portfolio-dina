import { Link } from "react-router-dom";
import { Button } from "@/components/admin/Button";

function ProjectCard({ project }) {
  function handleDelete(id) {
    console.log("delete");
  }

  return (
    <>
      <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md">
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

          <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
            <Link
              to={`/admin/projects/${project._id}/edit`}
              className="rounded-md bg-gray-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Edit
            </Link>

            <Button
              variant="danger"
              onClick={() => handleDelete(project._id)}
              className="rounded-md px-3.5 py-2 text-sm font-medium"
            >
              Delete
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

export default ProjectCard;
