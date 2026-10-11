import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/admin/Button";
import { loginUser } from "@/services/api";

// Página para iniciar una sesión
function Login() {
  // Guarda el estado de la información entrada en los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Obtiene la función login del contexto de autenticación
  const { login } = useAuth();
  const navigate = useNavigate();

  // Gestiona la inicialización de una sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Petición al API para validar el correo, contraseña
      const data = await loginUser(email, password);

      // Guarda la sesión de forma global
      login(data.accessToken, data.user);

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              Administración
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-black">
              Inicio de sesión
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Accede para gestionar el contenido del portfolio.
            </p>
          </div>

        {/* Formulario para inicializar una sesión */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Introduce tu contraseña"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="border-l-2 border-black pl-3 text-sm text-gray-700"
              >
                {error}
              </p>
            )}

            {/* Inicializa sesión */}
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Acceso exclusivo para administradores
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
