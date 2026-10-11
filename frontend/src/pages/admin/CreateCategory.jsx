import { useState } from "react";
import CategoryForm from "@/components/admin/CategoryForm";
import { createCategory } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// Función para crear nueva categoría
function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Token para confirmar que el usuario tienen autorización para crear categorías
  const { token } = useAuth();
  const navigate = useNavigate();

  // Crea nueva categroía
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
          Crear categoría
        </h1>

        {loading && <p className="mb-4 text-gray-600">Creando categoría...</p>}

        {error && <p className="mb-4 text-red-600">Error: {error}</p>}

        {success && (
          <p className="mb-4 text-green-600">Categoría creado con éxito!</p>
        )}

        {/* Renderiza el formulario para crear una categoría, onSubmit crear en vez de editar (porque usa el mismo componaente de formulario) */}
        <CategoryForm
          onSubmit={handleCreate}
          submitLabel="Crear categoría"
          initialValues=""
        />

        {/* Volver atrás */}
        <Link
          to="/admin/dashboard"
          className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </Link>
      </div>
    </main>
  );
}

export default CreateCategory;
