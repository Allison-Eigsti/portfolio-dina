import { createContext, useContext, useState } from "react";

// Guarda la información de autorización
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  //Inicializa el estado del token con el valor almacenado en localStorage
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  // Función para iniciar una sesión, guarda el token y los datos del usuario en localStorage y actualiza el estado
  const login = (accessToken, userData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
  };

  // Cierre sesión, quita el token del localstorage, y actuializa el estado
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  //  Comprueba si existe un token para determinar si el usuario está autenticado
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
