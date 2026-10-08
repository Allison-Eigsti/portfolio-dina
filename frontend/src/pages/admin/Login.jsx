import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/admin/Button'
import { loginUser } from '@/services/api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()
        setError('')

        try {
            const data = await loginUser(email, password)

            login(data.accessToken, data.user)

            navigate('/admin/dashboard')
        } catch (error) {
            setError(error.message)
        }
    }
    
    return(
        <>
            <h1>Admin Login</h1>

            <form onSubmit={handleLogin}>
                <label> Email </label>
                <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required />

                <label> Password </label>
                <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required />

                                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                <Button type="submit">Log In</Button>

            </form>
        </>
    )
}

export default Login