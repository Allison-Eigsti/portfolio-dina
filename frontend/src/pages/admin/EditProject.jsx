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
      setSaveError("You must be logged in to edit a project.");
      return;
    }

    try {
      setSaveError(null);

      const savedProject = await updateProject(id, formData, token);

      navigate(`/admin/projects/${savedProject._id}`);
    } catch (error) {
      setSaveError(error.message || "Failed to update project");
    } finally {
      setSaveError(false);
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <>
      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">
            Edit Project
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
            submitLabel="Edit Project"
            initialValues={project}
          />

          <Button variant="danger" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </main>
    </>
  );
}

export default EditProject;
