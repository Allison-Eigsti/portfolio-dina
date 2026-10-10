import { useState } from 'react'
import FlickerLink from './FlickerLink'


const links = [
    { to: '/', label: 'WORKS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' }
]


function NavBar() {
    const [open, setOpen] = useState(false)

    return(
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto flex h-16 items-center justify-end px-6"
            >
                <ul className="hidden items-center gap-4 sm:flex">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <FlickerLink to={to}>{label}</FlickerLink>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:hidden"
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        {open ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {open && (
                <ul className="border-t border-gray-100 px-4 py-3 sm:hidden">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <FlickerLink
                                to={to}
                                className="block"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </FlickerLink>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )

}

export default NavBar