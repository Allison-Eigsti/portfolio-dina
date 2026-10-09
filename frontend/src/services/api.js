const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL FROM VERCEL:", API_URL);


// Auth
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data;
}

// Projects
export const getProjects = async () => {
    const url = `${API_URL}/projects`;

    console.log("FETCHING PROJECTS FROM:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data = await response.json()
    console.log(data)
    return data
};


export const getProject = async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch project")
    }

    return response.json()
}

// Categories

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`)

    if (!response.ok) {
        throw new Error("Failed to fetch categories")
    }

    return response.json()
}


export const getCategory = async (id) => {
    const response = await fetch(`${API_URL}/categories/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch category")
    }

    return response.json()
}


export const createCategory = async (formData, token) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        },
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


export const getSiteSettings = async () => {
    const url = `${API_URL}/settings`;

    console.log("FETCHING SETTINGS FROM:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch site settings");
    }

    const data = await response.json()
    console.log(data)
    return data
}

export const updateSiteSettings = async (updatedSettings, token) => {
    const url = `${API_URL}/settings`;

    console.log("FETCHING SETTINGS FROM:", url);

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    body: JSON.stringify(updatedSettings)})

    if (!response.ok) {
        throw new Error("Failed to fetch site settings");
    }

    const data = await response.json()
    console.log(data)
    return data
}