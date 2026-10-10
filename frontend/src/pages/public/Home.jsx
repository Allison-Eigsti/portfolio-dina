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
  <section className="mx-auto flex min-h-[calc(100svh-4rem)] flex-col px-8 pb-8 xl:max-w-7xl 2xl:max-w-[96rem]">
    {/* Thumbnail area: takes all the space above the title and centers the row in it */}
    <div className="flex flex-1 items-center">
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

    {/* Title: same left edge as the thumbnails */}
    <h1 className="text-[6vw] font-black text-gray-300 tracking-wide leading-[1.05]">
      HELLO, I AM
      <br />
       <span className="font-black text-gray-900">DINA ABOUELELLA</span>
    </h1>
  </section>
);
}

export default Home;
