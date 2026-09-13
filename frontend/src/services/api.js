const API_URL = import.meta.env.VITE_API_URL;


// Projects
const getProjects = async () => {
    const response = await fetch(`${API_URL}/projects`)

    if (!response.ok) {
        throw new Error("Failed to fetch projects")
    }

    return response.json()
}

// Categories

const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`)

    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }

    return response.json()
}

export const createCategory = async (formData) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    console.log("Backend response:", data);

    if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to create category");
    }

    return data;
};


// SiteSettings


export {
    getProjects,
    getCategories
}
