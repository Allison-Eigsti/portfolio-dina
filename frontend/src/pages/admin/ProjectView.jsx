import { useProject } from '../../hooks/useProject'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/admin/Button'
import { deleteProject } from '@/services/api'
import { useAuth } from '@/context/AuthContext'


function ProjectView() {
    const navigate = useNavigate()

    const { id } = useParams()
    const { token } = useAuth()

    const [showConfirm, setShowConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const { project, loading, error } = useProject(id)


    if (loading) return <p>Loading project...</p>
    if (error) return <p>{error}</p>
    if (!project) return <p>Project not found.</p>

    const handleDelete = async () => {
        setDeleting(true)
        setDeleteError(null)

        try {
            await deleteProject(id, token)
            navigate(`/admin/categories/${project.category}`)
        } catch (err) {
            console.error(err.message)
            setDeleteError(err.message || 'Failed to delete project.')
            setDeleting(false)
        }
    }


    const refLabel = (ref) => ref?.name ?? ref?.username ?? ref?.email ?? ref?._id ?? ref

    const details = [
        { label: 'Client', value: project.client },
        { label: 'Agency', value: project.agency },
        { label: 'Year', value: project.year },
        { label: 'Display order', value: project.displayOrder }
        ]



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


                                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600">
                                        {project.projectBriefing}
                                    </p>

                                    <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-gray-100 pt-8 text-left sm:grid-cols-2">
                                        {details.map(({ label, value }) => (
                                            <div key={label}>
                                                <dt className="text-sm text-gray-500">{label}</dt>
                                                <dd className="mt-1 break-words text-sm font-medium text-gray-900">
                                                    {value || value === 0 ? value : '-'}
                                                </dd>
                                            </div>
                                        ))}

                                        <div className="sm:col-span-2">
                                            <dt className="text-sm text-gray-500">Software</dt>
                                            <dd className="mt-2 flex flex-wrap gap-2">
                                                {project.software?.length ? (
                                                    project.software.map((item) => (
                                                        <span
                                                            key={item}
                                                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </dd>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <dt className="text-sm text-gray-500">Tags</dt>
                                            <dd className="mt-2 flex flex-wrap gap-2">
                                                {project.tags?.length ? (
                                                    project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </dd>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <dt className="text-sm text-gray-500">Thumbnail</dt>
                                            <dd className="mt-2">
                                                {project.thumbnail?.url ? (
                                                    <img
                                                        src={project.thumbnail.url}
                                                        alt={project.thumbnail.alt || 'Project thumbnail'}
                                                        className="h-24 w-auto rounded-md border border-gray-200 object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </dd>
                                        </div>
                                    </dl>

                                <div className='flex gap-4'>

                                    <Link
                                        to={`/admin/projects/${project._id}/edit`}
                                        className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50adow-sm transition hover:bg-gray-700 hover:shadow"
                                    >
                                        Edit Project
                                    </Link>


                                    <Button
                                    variant="danger"
                                    type="button"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    Delete
                                </Button>

                                    <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
                                        Back to Category
                                    </Button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {showConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Delete project?
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    You are about to delete <strong>{project.title}</strong>.
                                    This action cannot be undone.
                                </p>

                                {deleteError && (
                                    <p className="mt-3 text-sm text-red-600">{deleteError}</p>
                                )}

                                <div className="mt-6 flex justify-end gap-3">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => {
                                            setShowConfirm(false)
                                            setDeleteError(null)
                                        }}
                                        disabled={deleting}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant="danger"
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >
                                        {deleting ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
            
            </main>
        </>
    )
}

export default ProjectView