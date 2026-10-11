import { useEffect, useState } from "react";
import { getProject } from "@/services/api";

// Custom hook para agarrar un proyecto
export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Permite cancelar la petición si cambia el id o se desmonta el componente
    const controller = new AbortController();

    const fetchProject = async () => {
      // Reinicia el estado al cambiar de proyecto
      setLoading(true);
      setError(null);

      try {
        const data = await getProject(id, controller.signal);
        setProject(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProject();

    // Función de limpieza: cancela la petición anterior
    return () => controller.abort();
  }, [id]);

  return { project, loading, error };
}