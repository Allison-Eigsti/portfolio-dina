import CategoryCard from "../../components/admin/CategoryCard";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";

function Category() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading categories...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-red-600">
                    Error: {error}
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">

                <div className="mb-10 flex items-center justify-between">

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Categories
                    </h1>

                    <Link
                        to="/categories/create"
                        className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
                    >
                        + Create Category
                    </Link>

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            {...category}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
}

export default Category;