import { useProjects } from '../../hooks/useProjects'
import { useCategory } from '../../hooks/useCategory'
import ProjectCard from '@/components/admin/ProjectCard'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditCategory from './EditCategory'



function CategoryView() {
    const [ editing, setEditing ] = useState(false)
    // Get params to load correct cateogory settings
    const { id } = useParams()

    // Fetch category
    const { category, loading: categoryLoading, error: categoryError } = useCategory(id)

    //Load projects and filter by category type
    const { projects, loading: projectsLoading, error: projectsError } = useProjects()

    if (categoryLoading || projectsLoading) return <p>Loading projects...</p>
    if (categoryError) return <p>{categoryError}</p>
    if (projectsError) return <p>{projectsError}</p>

    console.log("CATEGORY:", category);
    console.log("PROJECTS:", projects);


    return(
        <>
        <main>
            {editing ? (
                <EditCategory category={category} 
                onCancel={() => setEditing(false)}
                    onSave={(updatedCategory) => {
                        setCategory(updatedCategory)
                        setEditing(false)
                    }}
                />
            ) : (
        <>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                {category.name}
            </h1>

            <p className="mt-2 max-w-2xl text-base leading-7 text-gray-500">
                {category.description}
            </p>

                                <button onClick={() => setEditing(true)}>
                        Edit Category
                    </button>
        </>
        )}

            <h2>Projects</h2>

            <ul>
               {projects.filter((project) => (project.category === category._id))
                    .map((project) => (
                <li><ProjectCard key={project._id} project = {project}/></li>
               ))} 
            </ul>
        </main>
        </>
    )
}

export default CategoryView