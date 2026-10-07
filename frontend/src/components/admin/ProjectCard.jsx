import { Link } from 'react-router-dom'
import { Button } from '@/components/admin/Button'


function ProjectCard({ project }) {

    function handleDelete(id){
    console.log('delete')
    }

    return(
        <>
        <article className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-gray-300 hover:shadow-sm">
            <img src={project.thumbnail.url} alt={project.title} className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.02]"/>
            <div className="p-4">
                <h2 className="text-base font-semibold text-gray-900">
                    {project.title}
                </h2>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
                    {project.projectBriefing}
                </p>
            </div>

            <div>
                <Link to={`admin/projects/${project._id}/edit}`}>Editar</Link>
                <Button variant="danger" onClick={() => handleDelete(project._id)}>
                Borrar
                </Button>
            </div>
        </article>
        </>
    )
}

export default ProjectCard