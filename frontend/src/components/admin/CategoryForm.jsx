import { useState } from "react";

function CategoryForm({ onCreate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [displayOrder, setDisplayOrder] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("displayOrder", displayOrder);
        formData.append("thumbnail", thumbnail);

        onCreate(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
            </div>


            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Display Order
                </label>

                <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    required
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
                    placeholder="1"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Thumbnail
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    required
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-gray-700"
                />
            </div>

            <button
                type="submit"
                className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
                Create Category
            </button>
        </form>
    );
}

export default CategoryForm;