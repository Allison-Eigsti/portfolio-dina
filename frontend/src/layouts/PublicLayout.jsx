import { Outlet } from "react-router-dom";
import Navbar from "@/components/public/Navbar";

// Envuelve la parte pública del web con el navbar correcto
function PublicLayout() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
