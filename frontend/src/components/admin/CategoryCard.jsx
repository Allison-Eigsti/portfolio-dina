function CategoryCard({ name, description, thumbnail }) {
 return (
        <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md">

            {/* Image */}
            {thumbnail?.url && (
                <div className="overflow-hidden">
                    <img
                        src={thumbnail.url}
                        alt={thumbnail.alt || name}
                        className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            )}

            {/* Category Information */}
            <div className="p-5">

                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Category
                </p>

                <h2 className="mt-1 text-base font-semibold tracking-tight text-gray-900">
                    {name}
                </h2>

                {description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                        {description}
                    </p>
                )}

            </div>

        </article>
    );
}

export default CategoryCard;