import { useState } from "react";
import CategoryForm from "../../components/admin/CategoryForm";
import { createCategory } from "../../services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (category) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createCategory(category, token);
      setSuccess(true);
      navigate("/admin/dashboard");
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

        {loading && <p className="mb-4 text-gray-600">Creating category...</p>}

        {error && <p className="mb-4 text-red-600">Error: {error}</p>}

        {success && (
          <p className="mb-4 text-green-600">Category created successfully!</p>
        )}

        <CategoryForm
          onSubmit={handleCreate}
          submitLabel="Create Category"
          initialValues=""
        />

        <Link
          to="/admin/dashboard"
          className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}

export default CreateCategory;
