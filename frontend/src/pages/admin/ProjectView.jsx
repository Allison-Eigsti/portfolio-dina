import { useProject } from '../../hooks/useProject'

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'


function ProjectView() {
    const { id } = useParams()

    const { project, loading, error } = useProject(id)

    if (loading) return <p>Loading project...</p>
    if (error) return <p>{error}</p>


    return(
        <>
            <main className="min-h-screen bg-gray-100 px-6 py-12">
                    <section className="mb-12">
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                            <div className="flex flex-col items-center gap-6 text-center">
                                <div className="w-full max-w-4xl">
                                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                                        Project View
                                    </p>

                                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                                        {project.title}
                                    </h1>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Images
                                    </p>

                                    <section className="overflow-hidden rounded-xl">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                            {project.images.map((image) => (
                                                <div
                                                    key={image._id}
                                                    className="w-full min-w-0 overflow-hidden rounded-lg bg-gray-50 md:flex-1"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.alt || "Project image"}
                                                        className="h-auto w-full object-contain transition duration-300 hover:scale-[1.02]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </section>


                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        {project.projectBriefing}
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Published: {project.year}
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Agency: {project.agency}
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Client: {project.client}
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Created At: {project.createdAt}
                                    </p>

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Updated At: {project.updatedAt}
                                    </p>

                                    <Link
                                        to={`/admin/projects/${project._id}/edit`}
                                        className="shrink-0 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
                                    >
                                        Edit Project
                                    </Link>
                                    </div>
                            </div>

                        </div>
                    </section>

            
            </main>
        </>
    )
}

export default ProjectView