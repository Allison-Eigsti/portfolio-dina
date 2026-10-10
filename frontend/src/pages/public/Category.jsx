import { useCategory } from "../../hooks/useCategory";
import ProjectCard from "@/components/public/ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import { useParams } from 'react-router-dom'

function Category() {
    const { id } = useParams()
    const { category, loading: categoryLoading } = useCategory(id)
    const { projects, loading, error } = useProjects()

    const filteredProjects = (projects ?? []).filter((project) => {
        const projectCategoryId = project.category?._id ?? project.category
        return projectCategoryId === id
    })
        
    console.log('Filtered', filteredProjects)

    if (loading || categoryLoading) return <p>Loading...</p>
    if (error) return <p>Something went wrong.</p>;

    return(
        <>
        <div className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="mb-2 text-4xl font-black">{category?.name}</h1>
            <h2 className="mb-8 text-lg font-light text-gray-400">{category?.description}</h2>

            <div className="flex flex-col gap-16">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
        </>
    )
}

export default Category