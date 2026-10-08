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

            <section className="mb-12">
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

                    <div className="mb-8">
                        <h2 className="mb-6 text-xl font-semibold tracking-tight text-gray-900">
                            Site Information
                        </h2>

                    <Link
                        to="/admin/site-settings/edit"
                        className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
                    >
                        Edit
                    </Link>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Site Title
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900">
                                    {settings.siteTitle}
                                </p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <p className="min-h-[100px] rounded-md border border-gray-200 bg-gray-50 px-4 py-3 leading-relaxed text-gray-700">
                                    {settings.about.bio}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 border-t border-gray-100 pt-8">
                        <h2 className="mb-6 text-xl font-semibold tracking-tight text-gray-900">
                            Contact Information
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                                    {settings.contact.email}
                                </p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                                    {settings.contact.phone}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                                    {settings.contact.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8">
                        <h2 className="mb-6 text-xl font-semibold tracking-tight text-gray-900">
                            Social Links
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    LinkedIn
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                                    {settings.socialLinks.linkedin}
                                </p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Behance
                                </label>
                                <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                                    {settings.socialLinks.behance}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Categories
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your portfolio categories.
                        </p>
                    </div>

                    <Link
                        to="/admin/categories/create"
                        className="rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700 hover:shadow"
                    >
                        + Create Category
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category._id}
                            to={`/admin/categories/${category._id}`}
                            className="group"
                        >
                            <CategoryCard {...category} />
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    </main>
);
}

export default Dashboard;