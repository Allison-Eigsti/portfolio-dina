import { Outlet } from "react-router-dom";
import Navbar from '@/components/admin/AdminNavbar'

function AdminLayout() {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  );
}

export default AdminLayout;