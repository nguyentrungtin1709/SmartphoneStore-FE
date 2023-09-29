export function Error({ message }) {
    return (
        <p
            className="flex my-2 text-sm text-red-400 w-72 md:w-80 xl:w-96"
        >
            {message}
        </p>
    )
}
export default Error