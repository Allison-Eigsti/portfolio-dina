export function Button({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const variants = {
        primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
        secondary:
        "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400",

        danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    }

    return(
        <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`} {...props}>{children}</button>
    )
}
