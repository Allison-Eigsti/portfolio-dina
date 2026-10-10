import { useCategories } from "../../hooks/useCategories";
import { useMemo } from "react";
import ProjectThumbnail from "@/components/public/ProjectThumbnail";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function Home() {
  const { categories, loading, error } = useCategories();

  const tiles = useMemo(
    () =>
      shuffle(categories ?? []).map((category) => ({
        category,
        offsetY: Math.floor(Math.random() * 80) - 40,
      })),
    [categories],
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <section className="flex min-h-[calc(100svh-4rem)] flex-col">
        {/* Thumbnail area: takes all the space above the title and centers the row in it */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-6 py-16 sm:flex-nowrap">
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

        {/* Title: in normal flow at the bottom-left, so it can't overlap the tiles */}
        <h1 className="px-10 pb-4 text-[7vw] font-black leading-[0.95]">
          I AM DINA
          <br />
          ABOUELELLA
        </h1>
      </section>
    </>
  );
}

export default Home;
