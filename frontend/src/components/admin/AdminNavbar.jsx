import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/projects/new', label: 'New Project' },
    { to: '/admin/categories/create', label: 'New Category' }
]

const linkClasses = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${
        isActive
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`

function NavBar() {
    const [open, setOpen] = useState(false)

    return(
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
            >
                <Link
                    to="/"
                    className="text-lg font-semibold tracking-tight text-gray-900"
                >
                    Portfolio
                </Link>

                <ul className="hidden items-center gap-1 sm:flex">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} className={linkClasses}>
                                {label}
                            </NavLink>
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
                            <NavLink
                                to={to}
                                onClick={() => setOpen(false)}
                                className={(state) =>
                                    `block ${linkClasses(state)}`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}


export default NavBar