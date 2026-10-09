import { useState } from "react";
import ProjectForm from "../../components/admin/ProjectForm";
import { createProject } from "../../services/api";
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'


function NewProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { token } = useAuth()
    const navigate = useNavigate()



    const handleCreate = async (formData) => {
        if (!token) {
            setError("You must be logged in to create a project.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const project = await createProject(formData, token);
            setSuccess(true);
            navigate(`/admin/projects/${project._id}`)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
        <main className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-2xl">

                <h1 className="mb-8 text-4xl font-bold text-gray-900">
                    Create Project
                </h1>

                {loading && (
                    <p className="mb-4 text-gray-600">
                        Creating project...
                    </p>
                )}

                {error && (
                    <p className="mb-4 text-red-600">
                        Error: {error}
                    </p>
                )}

                {success && (
                    <p className="mb-4 text-green-600">
                        Project created successfully!
                    </p>
                )}

                <ProjectForm onSubmit={handleCreate} />

            </div>
        </main>
        </>
    )
}

export default NewProject