import { useProject } from "@/hooks/useProject";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/admin/Button";
import { useAuth } from "@/context/AuthContext";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/services/api";

function EditProject() {
  const { id } = useParams();

  const { project, loading, error } = useProject(id);
  const { token } = useAuth();

  const navigate = useNavigate();

  const [saveError, setSaveError] = useState(null);

  const handleSave = async (formData) => {
    if (!token) {
      setSaveError("Debes iniciar sesión para editar un proyecto.");
      return;
    }

    try {
      setSaveError(null);

      const savedProject = await updateProject(id, formData, token);

      navigate(`/admin/projects/${savedProject._id}`);
    } catch (error) {
      setSaveError(error.message || "Proyecto no actualizado con éxito");
    } finally {
      setSaveError(false);
    }
  };

  if (loading) return <p>Cargando proyecto...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>Proyecto no disponible.</p>;

  return (
    <>
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">
            Editar proyecto
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

          <ProjectForm
            onSubmit={handleSave}
            submitLabel="Editar proyecto"
            initialValues={project}
          />

          <Button variant="danger" type="button" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </div>
      </main>
    </>
  );
}

export default EditProject;
