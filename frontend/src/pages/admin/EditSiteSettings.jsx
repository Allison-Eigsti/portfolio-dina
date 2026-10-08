import { useSettings } from '../../hooks/UseSettings'
import { useRef, useState } from 'react'
import { updateSiteSettings } from '../../services/api'
import { Button } from '@/components/admin/Button'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'


function EditSiteSettings() {
    const { settings, settingsLoading, settingsError } = useSettings()
    const { token } = useAuth()

    const siteTitleRef = useRef(null)
    const navigate = useNavigate()

    const handleSave = async (e) => {
        e.preventDefault()

        try {
            const updatedSettings = {
            siteTitle: siteTitleRef.current.value
            }

            const savedSettings = await updateSiteSettings(updatedSettings, token)

            console.log('saved', savedSettings)

            navigate('/admin/dashboard')

            } catch (error) {
                console.log(error)
        }
    }

    if (settingsLoading
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-600">
                    Loading settings...
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
    
    return(
        <>
        <article className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">

                <form onSubmit={handleSave} className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm mb-12">

                    <div className="mb-8">
                        <h2 className="mb-6 text-xl font-semibold tracking-tight text-gray-900">
                            Site Information
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Site Title
                                </label>

                                <input
                                    type="text"
                                    ref={siteTitleRef}
                                    defaultValue={settings.siteTitle}
                                    className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
                                {/* <p className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900">
                                    {settings.siteTitle}
                                </p> */}
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

                    <Button type="submit">Save Changes</Button>
                </form>
        </div>
        </article>
        </>
    )
}

export default EditSiteSettings