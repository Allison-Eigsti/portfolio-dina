import { useCategory } from '@/hooks/useCategory'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import CategoryForm from '@/components/admin/CategoryForm'
import { updateCategory } from '@/services/api'

function EditCategory() {
    const { id } = useParams()

    const { category, loading, error } = useCategory(id)
    const { token } = useAuth()
    const navigate = useNavigate()

    const [ saveError, setSaveError ] = useState(null)

    const handleSave = async (formData) => {
        if (!token) {
            setSaveError("You must be logged in to edit a category.");
            return;
        }

        try {
            setSaveError(null)

            const savedCategory = await updateCategory(id, formData, token)

            navigate(`/admin/categories/${savedCategory._id}`)
        } catch (error) {
            setSaveError(error.message || 'Failed to update ca')
        } finally {
            setSaveError(false)
        }
    }

    if (loading) return <p>Loading category...</p>
    if (error) return <p>{error}</p>
    if (!category) return <p>Category not found.</p>

    return(
        <>
              <main className="min-h-screen bg-gray-100 px-6 py-12">
                <div className="mx-auto max-w-5xl">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                        Edit Category
                    </h1>

                    {saveError && (
                        <p role="a
                        lert" className="mb-4 text-sm text-red-600">
                            {saveError}
                        </p>
                    )}

                    <CategoryForm
                        onSubmit={handleSave}
                        submitLabel="Edit Category"
                        initialValues={category}
                    />
                </div>
            </main>
        </>
    )
}

export default EditCategory