export function AdminButton({ children, onClick, disabled }) {
    return (
        <button
            className="flex flex-row items-center justify-center px-2 py-2 bg-inherit text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white disabled:border-gray-400 disabled:text-gray-600 disabled:bg-inherit"
            onClick={onClick}
            disabled={disabled || false}
        >
            {children}
        </button>
    )
}