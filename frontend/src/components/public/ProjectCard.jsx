import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
    return (
        <Link
            to={`/project/${project._id}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        >
            <div className="aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
                <img
                    src={project.thumbnail?.url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <p className="mt-3 text-s font-semibold uppercase tracking-widest text-gray-500 transition-colors duration-300 group-hover:text-gray-900">
                {project.title}
            </p>
        </Link>
    )
}

export default ProjectCard