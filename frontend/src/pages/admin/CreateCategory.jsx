import { useState } from "react";
import CategoryForm from "../../components/admin/CategoryForm";
import { createCategory } from "../../services/api";

function CreateCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCreate = async (category) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await createCategory(category);
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-2xl">

                <h1 className="mb-8 text-4xl font-bold text-gray-900">
                    Create Category
                </h1>

                {loading && (
                    <p className="mb-4 text-gray-600">
                        Creating category...
                    </p>
                )}

                {error && (
                    <p className="mb-4 text-red-600">
                        Error: {error}
                    </p>
                )}

                {success && (
                    <p className="mb-4 text-green-600">
                        Category created successfully!
                    </p>
                )}

                <CategoryForm onCreate={handleCreate} />

            </div>
        </main>
    );
}

export default CreateCategory;