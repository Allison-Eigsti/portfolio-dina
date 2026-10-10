import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Protege las rutas administrativas
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Redirige el usuario al login si no está autorizado
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
