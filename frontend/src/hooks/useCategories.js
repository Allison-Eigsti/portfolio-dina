import { useEffect, useState } from "react";
import { getCategories } from "../services/api";

// Custom hook para agarrar todas las categorías
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Permite cancelar la petición si el componente se desmonta
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const data = await getCategories(controller.signal);
        setCategories(data);
      } catch (error) {
        // Una petición cancelada no es un error real
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCategories();

    // Función de limpieza: cancela la petición al desmontar
    return () => controller.abort();
  }, []);

  return { categories, loading, error };
}
