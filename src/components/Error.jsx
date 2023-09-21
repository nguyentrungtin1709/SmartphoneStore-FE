export function Error({ message }) {
    return (
        <p
            className="flex my-2 text-sm text-red-400"
        >
            {message}
        </p>
    )
}
export default Error