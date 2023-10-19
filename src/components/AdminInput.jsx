import {classNames} from "../utils/classNames.jsx";

export function AdminInput({ type, value, onChange, className, placeholder }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={classNames("flex w-72 md:w-80 xl:w-96 px-2 py-1.5 border border-gray-400 rounded-lg placeholder-gray-400", className)}
            placeholder={placeholder}
        />
    )
}