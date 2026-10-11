import { useCategory } from "@/hooks/useCategory";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CategoryForm from "@/components/admin/CategoryForm";
import { updateCategory } from "@/services/api";
import { Button } from "@/components/admin/Button";

// Editar categoría
function EditCategory() {
  // Coge parametro de id 
  const { id } = useParams();

  const { category, loading, error } = useCategory(id);
  // Se usará para autorizar el usuario a editar una categoría
  const { token } = useAuth();
  const navigate = useNavigate();

  const [saveError, setSaveError] = useState(null);

  // Envia los datos de los cambios de una categoría
  const handleSave = async (formData) => {
    if (!token) {
      setSaveError("Debes iniciar sesión para editar una categoría.");
      return;
    }

    try {
      setSaveError(null);

      const savedCategory = await updateCategory(id, formData, token);

      navigate(`/admin/categories/${savedCategory._id}`);
    } catch (error) {
      setSaveError(error.message || "Categoría no actualizada con éxito.");
    } finally {
      setSaveError(false);
    }
  };

  // Maneja de estados de carga, errores
  if (loading) return <p>Cargando categoría...</p>;
  if (error) return <p>{error}</p>;
  if (!category) return <p>Categoría no disponible.</p>;

  return (
    <>
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">
            Editar categoría
          </h1>

          {saveError && (
            <p
              role="a
                        lert"
              className="mb-4 text-sm text-red-600"
            >
              {saveError}
            </p>
          )}

          {/* Formulario de la categoría, onSubmit usa la función para editar no crear */}
          <CategoryForm
            onSubmit={handleSave}
            submitLabel="Editar categoría"
            initialValues={category}
          />

          {/* Cancelar el formulario */}
          <Button variant="danger" type="button" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </div>
      </main>
    </>
  );
}

export default EditCategory;
