import { useEffect, useState } from "react";
import { getCategory } from "../services/api";

// Custom hook para agarrar una categoría
export function useCategory(id) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Permite cancelar la petición si cambia el id o se desmonta el componente
    const controller = new AbortController();

    const fetchCategory = async () => {
      // Reinicia el estado al cambiar de categoría
      setLoading(true);
      setError(null);

      try {
        const data = await getCategory(id, controller.signal);
        setCategory(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCategory();

    // Función de limpieza: cancela la petición anterior
    return () => controller.abort();
  }, [id]);

  return { category, loading, error };
}