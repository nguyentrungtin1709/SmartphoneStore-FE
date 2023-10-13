import {classNames} from "../utils/classNames.jsx";

export function DeleteButton({ className, onClick }) {
    return (
        <button
            className={classNames("flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-red-600 hover:bg-red-500 hover:text-white rounded-lg", className)}
            onClick={onClick}
        >
            <i className="uil uil-trash-alt"></i>
        </button>
    )
}