import { useProject } from '@/hooks/useProject'
import { useParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { Button } from '@/components/admin/Button'
import { useAuth } from '@/context/AuthContext'



function EditProject() {
    const { id } = useParams()

    const { project, loading, error } = useProject(id)
    const { token } = useAuth()

    const titleRef = useRef(null)
    // const titleRef = useRef(null)
    // const titleRef = useRef(null)
    // const titleRef = useRef(null)
    // const titleRef = useRef(null)
    // const titleRef = useRef(null)
    const navigate = useNavigate()

    const handleSave = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('title', project.title)


        // try{
        //     const updatedFields = {
        //         title: titleRef.current.value 
        //     }

        //     const savedFields = await(id, updatedFields, token)

        //     console.log('saved', savedFields)

        //     navigate(`/admin/projects/${project._id}`)
        //     } catch (error) {
        //         console.log(error)
        // }
    }


    if (loading) return <p>Loading project...</p>
    if (error) return <p>{error}</p>

    return(
        <>
            <p>Edit Project {project.title}</p>


              <main className="min-h-screen bg-gray-100 px-6 py-12">
                    <section className="mb-12">
                        <form onSubmit={handleSave} className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                            <div className="flex flex-col items-center gap-6 text-center">
                                <div className="w-full max-w-4xl">
                                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                                        Project View
                                    </p>

                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Project Title
                                </label>

                                    <input 
                                        type="text"
                                        ref={titleRef}
                                        defaultValue={project.title}
                                        className="text-3xl font-semibold tracking-tight text-gray-900"
                                    />

                                    <p className="mt-3 text-base leading-7 text-gray-500">
                                        Images
                                    </p>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Thumbnail
                                        </label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setThumbnail(e.target.files[0])}
                                            required
                                            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-gray-700"
                                        />
                                </div>

                                    {/* <section className="overflow-hidden rounded-xl">
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
                                    </p> */}

                                    <Button
                                        type="submit"
                                    >
                                        Save Changes
                                    </Button>
                                    </div>
                            </div>

                        </form>
                    </section>

            
            </main>
        </>
    )
}

export default EditProject