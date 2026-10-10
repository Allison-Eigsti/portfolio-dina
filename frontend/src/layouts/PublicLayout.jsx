import { Outlet } from "react-router-dom";
import Navbar from '@/components/public/Navbar'

function PublicLayout() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
      </main>

      <footer>
        {/* Public portfolio footer */}
      </footer>
    </>
  );
}

export default PublicLayout;