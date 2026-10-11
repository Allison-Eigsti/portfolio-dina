import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

// Custom hook para agarrar todos los proyectos
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Permite cancelar la petición si el componente se desmonta
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const data = await getProjects(controller.signal);
        setProjects(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProjects();

    // Función de limpieza: cancela la petición al desmontar
    return () => controller.abort();
  }, []);

  return { projects, loading, error };
}