export function Error({ message }) {
    return (
        <p
            className="flex my-2 text-sm text-red-500"
        >
            {message}
        </p>
    )
}
export default Error