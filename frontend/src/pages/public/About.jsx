import { useSettings } from "@/hooks/UseSettings";

function About() {
  const { settings, settingsLoading, settingsError } = useSettings();

  if (settingsLoading) return <p>Loading...</p>;
  if (settingsError) return <p>Something went wrong.</p>;

  console.log(settings);


const about = settings?.about
const photoUrl = 'https://res.cloudinary.com/snb0nqnu/image/upload/v1791638896/test2.png'

const label = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400'

  return (
    <>
        <div className="mx-auto xl:max-w-7xl 2xl:max-w-[96rem] px-8 py-16">
            <div className="grid grid-cols-12 gap-x-6 gap-y-14 sm:gap-y-0">
                {/* Bio */}
                <p className="col-span-12 text-3xl font-light leading-snug tracking-tight text-gray-900 sm:col-span-9 sm:text-5xl">
                    {about?.bio}
                </p>

                {photoUrl && (
                    <div className="col-span-7 col-start-6 sm:col-span-4 sm:col-start-8 sm:row-start-2 sm:mt-10">
                        <div className="aspect-square overflow-hidden bg-gray-100">
                            <img
                                src={photoUrl}
                                alt='Portrait of the designer'
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                )}

                <section className="col-span-5 col-start-2 sm:col-span-3 sm:col-start-2 sm:row-start-2 sm:mt-28">
                    <h2 className={label}>Languages</h2>
                    <ul className="mt-4 space-y-1">
                        {about?.languages?.map((language) => (
                            <li key={language} className="text-sm text-gray-900">
                                {language}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="col-span-5 col-start-8 sm:col-span-2 sm:col-start-5 sm:row-start-2 sm:mt-56">
                    <h2 className={label}>Software</h2>
                    <ul className="mt-4 space-y-1">
                        {about?.software?.map((software) => (
                            <li key={software} className="text-sm text-gray-900">
                                {software}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    </>
  );
}

export default About;
