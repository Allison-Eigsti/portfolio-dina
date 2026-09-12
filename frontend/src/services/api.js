const API_URL = import.meta.env.VITE_API_URL;

const getProjects = async () => {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
};

export {
    getProjects
};