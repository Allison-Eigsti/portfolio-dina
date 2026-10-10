import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const randomDelays = (length, step = 60) =>
  [...Array(length).keys()]
    .sort(() => Math.random() - 0.5)
    .map((i) => i * step)

export default function FlickerLink({ to, children }) {
  const text = String(children)
  const [delays, setDelays] = useState(() => randomDelays(text.length))

  return (
    <NavLink
      to={to}
      aria-label={text}
      onMouseEnter={() => setDelays(randomDelays(text.length))}
      className={({ isActive }) =>
        `group px-3 py-2 text-sm font-bold tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${
          isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`
      }
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block whitespace-pre group-hover:animate-flicker motion-reduce:animate-none"
          style={{ animationDelay: `${delays[i]}ms` }}
        >
          {char}
        </span>
      ))}
    </NavLink>
  )
}