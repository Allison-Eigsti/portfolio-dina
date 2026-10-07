import { useEffect, useState } from "react";
import { getSiteSettings } from "../services/api";

export function useSettings() {
    const [ settings, setSettings ] = useState(null)
    const [settingsLoading, setSettingsLoading] = useState(true);
    const [settingsError, setSettingsError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSiteSettings()
                setSettings(data)
            } catch (error) {
                setSettingsError(error.message)
            } finally {
                setSettingsLoading(false)
            }
        }

        fetchSettings()
    }, []);

    return { settings, settingsLoading, settingsError };
}