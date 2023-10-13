import {Link} from "react-router-dom";
import {classNames} from "../utils/classNames.jsx";

export function UpdateButton({ url, className }) {
    return (
        <Link
            to={url}
            className={classNames("flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 text-yellow-600 hover:bg-yellow-500 hover:text-stone-900 rounded-lg", className)}
        >
            <i className="uil uil-edit"></i>
        </Link>
    )
}