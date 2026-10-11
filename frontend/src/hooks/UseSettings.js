import { useEffect, useState } from "react";
import { getSiteSettings } from "../services/api";

// Custom hook para agarrar la configuración
export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsError, setSettingsError] = useState(null);

  useEffect(() => {
    // Permite cancelar la petición si el componente se desmonta
    const controller = new AbortController();

    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings(controller.signal);
        setSettings(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setSettingsError(error.message);
      } finally {
        if (!controller.signal.aborted) setSettingsLoading(false);
      }
    };

    fetchSettings();

    // Función de limpieza: cancela la petición al desmontar
    return () => controller.abort();
  }, []);

  return { settings, settingsLoading, settingsError };
}