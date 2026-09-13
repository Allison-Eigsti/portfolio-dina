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


// SiteSettings


export {
    getProjects,
    getCategories
}
