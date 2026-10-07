import CategoryCard from "../../components/admin/CategoryCard";
import { useCategories } from "../../hooks/useCategories";
import { useSettings } from '../../hooks/UseSettings'
import { Link } from "react-router-dom";



function Dashboard() {
    const { categories, loading, error } = useCategories();
    const { settings, settingsLoading, settingsError } = useSettings();


    if (loading || settingsLoading
    ) {
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

    if (settingsError) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-red-600">
                    Error: {settingsError}
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">

                <div className="mb-10 flex items-center justify-between">

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Site Settings
                    </h1>

                    <p>{settings.siteTitle}</p>
                    <p>Description: {settings.about.bio}</p>
                    {/* <ul>{settings.software.map(item => (<li>{item}</li>))}</ul> */}
                    <p>{settings.contact.email}</p>
                    <p>{settings.contact.phone}</p>
                    <p>{settings.contact.location}</p>
                    <p>{settings.socialLinks.linkedin}</p>
                    <p>{settings.socialLinks.behance}</p>
                    {/* <p>Last updated: {settings.updatedAt}</p> */}





                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Categories
                    </h1>

                    <Link
                        to="/admin/categories/create"
                        className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
                    >
                        + Create Category
                    </Link>

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link key={category._id} to={`/admin/categories/${category._id}`}>
                        <CategoryCard
                            key={category._id}
                            {...category}
                        />
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}

export default Dashboard;