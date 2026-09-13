import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <nav>
        {/* Public portfolio navigation */}
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        {/* Public portfolio footer */}
      </footer>
    </>
  );
}

export default PublicLayout;