import { useSettings } from "@/hooks/UseSettings";

function Contact() {
  const { settings, settingsLoading, settingsError } = useSettings();

  if (settingsLoading) return <p>Loading...</p>;
  if (settingsError) return <p>Something went wrong.</p>;


  const contact = settings?.contact

  const posters = [
  { src: 'https://res.cloudinary.com/snb0nqnu/image/upload/v1791642079/v2.png', alt: 'Poster 1' },
  { src: 'https://res.cloudinary.com/snb0nqnu/image/upload/v1791642039/Kindness.png', alt: 'Poster 2' },
  { src: 'https://res.cloudinary.com/snb0nqnu/image/upload/v1791642065/SEv.png', alt: 'Poster 3' },
  { src: 'https://res.cloudinary.com/snb0nqnu/image/upload/v1791642368/cumbia.jpg', alt: 'Poster 4' },
]

console.log(settings)

const link =
  'text-3xl font-light leading-snug tracking-tight text-gray-900 underline-offset-8 transition-colors hover:text-gray-500 hover:underline sm:text-5xl'

return (
  <div className="mx-auto flex min-h-[calc(100svh-4rem)] flex-col px-8 pb-8 pt-16 xl:max-w-7xl 2xl:max-w-[96rem]">
    <div className="flex flex-1 items-center">
    <div className="grid w-full grid-cols-12 gap-x-6 gap-y-10 sm:gap-y-14">

      {/* Location: flush left */}
      <p className="col-span-12 text-3xl font-light leading-snug tracking-tight text-gray-900 sm:col-span-8 sm:text-5xl">
        {contact?.location}
      </p>

      {/* Phone: pushed right */}
      <p className="col-span-12 sm:col-span-7 sm:col-start-7">
        <a
          href={`tel:${contact?.phone?.replace(/\s/g, '')}`}
          className={link}
        >
          {contact?.phone}
        </a>
      </p>

      {/* Email: slight indent */}
      <p className="col-span-12 break-words sm:col-span-10 sm:col-start-4">
        <a href={`mailto:${contact?.email}`} className={link}>
          {contact?.email}
        </a>
      </p>

      {/* Socials: no heading, tucked toward the right */}
      <ul className="col-span-12 flex gap-x-10 sm:col-span-6 sm:col-start-9 flex-wrap">
        {settings?.socialLinks?.behance && (
          <li>
            <a
              href={settings.socialLinks.behance}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Behance
            </a>
          </li>
        )}
        {settings?.socialLinks?.linkedin && (
          <li>
            <a
              href={settings.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </div>
    </div>

    <div className="mt-12 flex justify-center gap-4 md:justify-start">
      {posters.map((poster) => (
        <img
          key={poster.src}
          src={poster.src}
          alt={poster.alt}
          className="h-auto max-h-[20svh] w-auto max-w-[calc((100%-3rem)/4)]"
        />
      ))}
    </div>
  </div>
)
}

export default Contact;
