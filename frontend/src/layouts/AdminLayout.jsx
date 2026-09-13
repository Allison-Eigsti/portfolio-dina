import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <nav>
        {/* Admin navigation */}
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;