function CategoryCard({ name, description, thumbnail }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Image */}
            {thumbnail?.url && (
                <div className="h-36 overflow-hidden">
                    <img
                        src={thumbnail.url}
                        alt={thumbnail.alt || name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Text */}
            <div className="flex min-h-36 flex-col justify-between p-5">

                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                        Category
                    </p>

                    <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                        {name}
                    </h2>

                    {description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

            </div>

        </article>
    );
}

export default CategoryCard;