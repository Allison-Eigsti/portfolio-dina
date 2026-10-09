import { useEffect, useState } from "react";
import { getProject } from "../services/api";

export function useProject(id) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(id);
                setProject(data);
                console.log(data)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

return { project, loading, error };
}