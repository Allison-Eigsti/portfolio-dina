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
    const bio = useRef(null)
    const email = useRef(null)
    const phone = useRef(null)
    const location = useRef(null)
    const linkedin = useRef(null)
    const behance = useRef(null)
    const navigate = useNavigate()

    const handleSave = async (e) => {
        e.preventDefault()

        try {
            const updatedSettings = {
            siteTitle: siteTitleRef.current.value,
            about: {
                bio: bio.current.value,
            },

            contact: {
                email: email.current.value,
                phone: phone.current.value,
                location: location.current.value,
            },

            socialLinks: {
                linkedin: linkedin.current.value,
                behance: behance.current.value,
            }
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
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Bio
                                </label>

                                <input
                                    type="text"
                                    ref={bio}
                                    defaultValue={settings.about.bio}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                    rows="5"
                                />
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

                                <input
                                    type="email"
                                    ref={email}
                                    defaultValue={settings.contact.email}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                
                                <input
                                    type="phone"
                                    ref={phone}
                                    defaultValue={settings.contact.phone}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    ref={location}
                                    defaultValue={settings.contact.location}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
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

                                <input
                                    type="text"
                                    ref={linkedin}
                                    defaultValue={settings.socialLinks.linkedin}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Behance
                                </label>

                                <input
                                    type="text"
                                    ref={behance}
                                    defaultValue={settings.socialLinks.behance}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900"
                                />
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