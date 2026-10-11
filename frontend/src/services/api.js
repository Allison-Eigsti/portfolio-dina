const API_URL = import.meta.env.VITE_API_URL;


// Auth
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// Proyectos
export const getProjects = async (signal) => {
  const response = await fetch(`${API_URL}/projects`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};

export const getProject = async (id, signal) => {
  const response = await fetch(`${API_URL}/projects/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
};

export const createProject = async (formData, token) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to create project");
  }

  return data;
};

export const updateProject = async (id, updatedFields, token) => {
  const url = `${API_URL}/projects/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: updatedFields,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to update project.");
  }

  return data;
};

export const deleteProject = async (id, token) => {
  const url = `${API_URL}/projects/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to delete project.");
  }

  if (response.status === 204) {
    return null;
  }

  return data;
};

// Categorías

export const getCategories = async (signal) => {
  const response = await fetch(`${API_URL}/categories`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getCategory = async (id, signal) => {
  const response = await fetch(`${API_URL}/categories/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
};

export const createCategory = async (formData, token) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to create category");
  }

  return data;
};

export const updateCategory = async (id, formData, token) => {
  const url = `${API_URL}/categories/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to update category.");
  }

  return data;
};

export const deleteCategory = async (id, token) => {
  const url = `${API_URL}/categories/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to delete category.");
  }

  if (response.status === 204) {
    return null;
  }

  return data;
};

// Configuración

export const getSiteSettings = async (signal) => {
  const response = await fetch(`${API_URL}/settings`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch site settings");
  }

  return response.json();
};


export const updateSiteSettings = async (updatedSettings, token) => {
  const url = `${API_URL}/settings`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSettings),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch site settings");
  }

  const data = await response.json();
  return data;
};
