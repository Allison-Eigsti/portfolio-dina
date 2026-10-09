import { useProjects } from '../../hooks/useProjects'
import { useCategory } from '../../hooks/useCategory'
import ProjectCard from '@/components/admin/ProjectCard'

import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import EditCategory from './EditCategory'



function CategoryView() {
    const navigate = useNavigate()
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


    return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">

            {editing ? (
                <EditCategory
                    category={category}
                    onCancel={() => setEditing(false)}
                    onSave={(updatedCategory) => {
                        setCategory(updatedCategory);
                        setEditing(false);
                    }}
                />
            ) : (
                <>
                    {/* Category Information */}
                    <section className="mb-12">
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                            <div className="flex items-start justify-between gap-6">
                                <div className="max-w-2xl">
                                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                                        Category
                                    </p>

                                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                                        {category.name}
                                    </h1>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        {category.description}
                                    </p>
                                </div>

                                <Link
                                    to={`/admin/categories/${category._id}/edit`}
                                    className="shrink-0 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
                                >
                                    Edit Category
                                </Link>
                            </div>

                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                                Projects
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Projects assigned to this category.
                            </p>

                            <button
                                    onClick={() => navigate('/admin/projects/new')}
                                    className="shrink-0 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
                                >
                                    New Project
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {projects
                                .filter(
                                    (project) =>
                                        project.category === category._id
                                )
                                .map((project) => (
                                    <Link key={project._id}
                                            to={`/admin/projects/${project._id}`}>
                                        <ProjectCard project={project} />
                                    </Link>
                                ))}
                        </div>
                    </section>
                </>
            )}

        </div>
    </main>
);
}

export default CategoryView