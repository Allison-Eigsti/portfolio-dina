import { useCategories } from "../../hooks/useCategories";
import { useMemo } from "react";
import ProjectThumbnail from "@/components/public/ProjectThumbnail";

// Función para cambiar el orden de las miniaturas cada vez que se refresca la página
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Función para la página de inicio
function Home() {
  // Obtiene las categorías
  const { categories, loading, error } = useCategories();

  // Función para renderizar las miniaturas en un orden y a una altura diferente cada vez q se refresca la página
  const tiles = useMemo(
    () =>
      shuffle(categories ?? []).map((category) => ({
        category,
        offsetY: Math.floor(Math.random() * 80) - 40,
      })),
    [categories],
  );

  // Estados de carga, error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] flex-col px-8 pb-8 xl:max-w-7xl 2xl:max-w-[96rem]">
      {/* Área de miniatura: centra la fila */}
      <div className="flex flex-1 items-center">
        {/* Muestra las tarjetas de miniaturas de proyectos, una para cada categoría */}
        <div className="flex w-full flex-wrap items-center gap-8 py-16 sm:flex-nowrap">
          {tiles.map(({ category, offsetY }) => (
            <div
              key={category._id}
              className="w-[45%] sm:w-auto sm:min-w-0 sm:flex-1 sm:[transform:translateY(var(--y))]"
              style={{ "--y": `${offsetY}px` }}
            >
              <ProjectThumbnail category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Título */}
      <h1 className="text-[6vw] font-black text-gray-300 tracking-wide leading-[1.05]">
        HOLA, SOY
        <br />
        <span className="font-black text-gray-900">DINA ABOUELELLA</span>
      </h1>
    </section>
  );
}

export default Home;
