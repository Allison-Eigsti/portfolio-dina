import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(
        () => localStorage.getItem('accessToken')
    )

    const login = (accessToken, userData) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(accessToken)
        setUser(userData)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    const isAuthenticated = !!token

    return(
        <AuthContext.Provider value ={{ user, token, login, logout, isAuthenticated }}>{ children }</AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}