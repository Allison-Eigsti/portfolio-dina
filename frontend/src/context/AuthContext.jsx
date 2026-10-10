import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch {
            return null
        }
    })
    
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
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')

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