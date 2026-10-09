import { useState, useEffect } from "react";
import { Button } from '@/components/admin/Button'

function CategoryForm({ onSubmit, submitLabel, initialValues }) {
    const [name, setName] = useState(initialValues.name || "");
    const [description, setDescription] = useState(initialValues.description || "");
    const [thumbnail, setThumbnail] = useState(null);
    const [displayOrder, setDisplayOrder] = useState(initialValues.displayOrder ?? "");


    useEffect(() => {
        setName(initialValues.name || "");
        setDescription(initialValues.description || "");
        setDisplayOrder(initialValues.displayOrder ?? "");
        setThumbnail(null);
    }, [initialValues])


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name.trim());
        formData.append("description", description);
        formData.append("displayOrder", displayOrder);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label  htmlFor="category-name" className="mb-2 block text-sm font-medium text-gray-700">
                    Category Name
                </label>

                <input
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
            </div>

            <div>
                <label htmlFor="category-description"
                        className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>

                <textarea
                    id="category-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
            </div>


            <div>
                <label htmlFor="category-order" className="mb-2 block text-sm font-medium text-gray-700">
                    Display Order
                </label>

                <input
                    id="category-order"
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    required
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
                    placeholder="1"
                />
            </div>

            {initialValues.thumbnail?.url && (
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Current Thumbnail
                    </p>

                    <img
                        src={initialValues.thumbnail.url}
                        alt={initialValues.name || "Current category thumbnail"}
                        className="h-40 w-auto rounded-lg object-cover"
                    />
                </div>
            )}

            <div>
                <label
                    htmlFor="category-thumbnail"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Thumbnail {initialValues._id ? "(Optional)" : "*"}
                </label>

                <input
                    id="category-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setThumbnail(e.target.files?.[0] || null)
                    }
                    required={!initialValues._id}
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-gray-700"
                />
            </div>

            <Button
                type="submit"
                className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
                {submitLabel}
            </Button>
        </form>
    );
}

export default CategoryForm;