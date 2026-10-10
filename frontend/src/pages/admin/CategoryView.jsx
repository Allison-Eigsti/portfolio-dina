import { useProjects } from "../../hooks/useProjects";
import { useCategory } from "../../hooks/useCategory";
import ProjectCard from "@/components/admin/ProjectCard";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/admin/Button";
import { deleteCategory } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

function CategoryView() {
  const navigate = useNavigate();
  // Get params to load correct cateogory settings
  const { id } = useParams();
  const { token } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch category
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory(id);

  //Load projects and filter by category type
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();

  if (categoryLoading || projectsLoading) return <p>Loading projects...</p>;
  if (categoryError) return <p>{categoryError}</p>;
  if (projectsError) return <p>{projectsError}</p>;
  if (!category) return <p>Categoría no disponible.</p>;

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteCategory(id, token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.message);
      setDeleteError(error.message || "No se logró borrar esta categoría.");
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Category Information */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                  Categoría
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                  {category.name}
                </h1>

                <p className="mt-3 text-base leading-7 text-gray-500">
                  {category.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  to={`/admin/categories/${category._id}/edit`}
                  className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 mt-6 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50adow-sm transition hover:bg-gray-700 hover:shadow"
                >
                  Editar Categoría
                </Link>

                <Button
                  variant="danger"
                  type="button"
                  onClick={() => setShowConfirm(true)}
                >
                  Borrar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Proyectos
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Proyectos que pertenecen a esta categoría.
            </p>

            <button
              onClick={() => navigate("/admin/projects/new")}
              className="mt-4 shrink-0 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
            >
              Nuevo Proyecto
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((project) => project.category === category._id)
              .map((project) => (
                <Link key={project._id} to={`/admin/projects/${project._id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
          </div>
        </section>

        <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
          Volver al inicio
        </Button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Borrar categoría?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Estás a punto de borrar <strong>{category.name}</strong>. Esta acción no se puede deshacer.
            </p>

            {deleteError && (
              <p className="mt-3 text-sm text-red-600">{deleteError}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteError(null);
                }}
                disabled={deleting}
              >
                Cancelar
              </Button>

              <Button
                variant="danger"
                type="button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CategoryView;
