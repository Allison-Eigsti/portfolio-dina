import { Outlet } from "react-router-dom";
import Navbar from "@/components/admin/AdminNavbar";

// Envuelve la parte administrativa del web con el navbar correcto
function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
