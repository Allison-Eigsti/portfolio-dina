import { useParams } from 'react-router-dom'
import { useProject } from '@/hooks/useProject'

function ProjectView() {
    const { id } = useParams()
    const { project, loading, error } = useProject(id)


    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong.</p>;

    return(
        <>
<div className="mx-auto max-w-6xl px-8 py-16">
    <header className="mb-16">
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            {project.title}
        </h1>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-200 pt-6 sm:grid-cols-3">
            {[
                ['Client', project.client],
                ['Agency', project.agency],
                ['Year', project.year],
            ].map(([label, value]) => (
                <div key={label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                </div>
            ))}
        </dl>

        <p className="mt-12 max-w-6xl text-lg font-light leading-relaxed text-gray-600">
            {project.projectBriefing}
        </p>
    </header>

    <div className='mt-20 flex flex-col items-center'>
        {project.images.map((img, i) => (
            <img
                key={img._id ?? img.url ?? i}
                src={img.url}
                alt={img.alt ?? ''}
                loading="lazy"
                className='mb-4 block h-auto max-w-4xl break-inside-avoid'
            />
        ))}
    </div>
</div>
        </>
    )
}

export default ProjectView