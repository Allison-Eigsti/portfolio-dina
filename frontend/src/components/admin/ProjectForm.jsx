import { useRef } from "react";
import { Button } from '@/components/admin/Button'
import { useCategories } from '@/hooks/useCategories'


function ProjectForm({ onSubmit, submitLabel, initialValues = {}}) {
    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories();

    const titleRef = useRef(null)
    const categoryRef = useRef(null);
    const clientRef = useRef(null);
    const agencyRef = useRef(null);
    const yearRef = useRef(null);
    const briefingRef = useRef(null);
    const softwareRef = useRef(null);
    const tagsRef = useRef(null);
    const thumbnailRef = useRef(null);
    const imagesRef = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault()

            const formData = new FormData()

            formData.append("title", titleRef.current.value.trim());
            formData.append("category", categoryRef.current.value);   
            formData.append("client", clientRef.current.value.trim());
            formData.append("agency", agencyRef.current.value.trim());
            formData.append("projectBriefing", briefingRef.current.value.trim());         
            
            if (yearRef.current.value) {
                formData.append("year", yearRef.current.value);
            }

            const software = softwareRef.current.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            const tags = tagsRef.current.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            formData.append("software", JSON.stringify(software));
            formData.append("tags", JSON.stringify(tags));

            const layout = {
                type: "grid",
                template: "default",
                settings: {
                    columns: 3,
                    gap: 3,
                },
            };

            formData.append("layout", JSON.stringify(layout));

            formData.append(
                "thumbnail",
                thumbnailRef.current.files[0]
            );

            const imageFiles = imagesRef.current.files;

            for (const image of imagesRef.current.files) {
                formData.append("images", image);
            }

            onSubmit(formData)
    }



    return(
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >     
            
            <section className="space-y-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Basic Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Add/edit the main details about your project.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Project Title *
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={initialValues.title || ''}
                        ref={titleRef}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        placeholder="e.g. Brand Identity Campaign"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Category *
                    </label>

                    {categoriesLoading ? (
                        <p className="text-sm text-gray-500">
                            Loading categories...
                        </p>
                    ) : categoriesError ? (
                        <p className="text-sm text-red-600">
                            {categoriesError}
                        </p>
                    ) : (
                        <select
                            id="category"
                            name="category"
                            ref={categoryRef}
                            required    
                            defaultValue={initialValues.category || ''}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>

                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="client"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Client
                        </label>

                        <input
                            id="client"
                            name="client"
                            type="text"
                            defaultValue={initialValues.client || ''}
                            ref={clientRef}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Client name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="agency"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Agency
                        </label>

                        <input
                            id="agency"
                            name="agency"
                            type="text"
                            ref={agencyRef}
                            defaultValue={initialValues.agency || ''}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            placeholder="Agency name"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="year"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Publication Year
                    </label>

                    <input
                        id="year"
                        name="year"
                        type="number"
                        ref={yearRef}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        defaultValue={initialValues.year || ''}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        placeholder="e.g. 2026"
                    />
                </div>

                <div>
                    <label
                        htmlFor="projectBriefing"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Project Briefing
                    </label>

                    <textarea
                        id="projectBriefing"
                        name="projectBriefing"
                        ref={briefingRef}
                        rows={5}
                        defaultValue={initialValues.projectBriefing || ''}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        placeholder="Describe the project, its goals, and the work involved..."
                    />
                </div>
            </section>

            <section className="space-y-5 border-t border-gray-100 pt-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Software and Tags
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Separate each item with a comma.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="software"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Software
                    </label>

                    <input
                        id="software"
                        name="software"
                        type="text"
                        ref={softwareRef}
                        defaultValue={initialValues.software || ''}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        placeholder="Photoshop, Illustrator, Figma"
                    />
                </div>

                <div>
                    <label
                        htmlFor="tags"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Tags
                    </label>

                    <input
                        id="tags"
                        name="tags"
                        type="text"
                        ref={tagsRef}
                        defaultValue={initialValues.tags || ''}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        placeholder="branding, editorial, packaging"
                    />
                </div>
            </section>

            <section className="space-y-5 border-t border-gray-100 pt-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Project Images
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Upload a thumbnail and at least one project image.
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="thumbnail"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Project Thumbnail *
                    </label>

                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="file"
                        ref={thumbnailRef}
                        accept="image/*"
                        required
                        className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="images"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Gallery Images *
                    </label>

                    <input
                        id="images"
                        name="images"
                        type="file"
                        ref={imagesRef}
                        accept="image/*"
                        multiple
                        required
                        className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        You can select multiple images at once.
                    </p>
                </div>
            </section>

            <div className="border-t border-gray-100 pt-6">
                <Button
                    type="submit"
                    className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 sm:w-auto"
                >
                    {submitLabel}
                </Button>
            </div>
        </form>
    )
}

export default ProjectForm