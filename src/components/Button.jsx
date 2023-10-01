import {classNames} from "../utils/classNames.jsx";

function Button({ children, custom, onClick }){
    return (
        <button
            className={classNames("flex justify-center items-center px-4 py-2 rounded-lg bg-purple-600 text-gray-50 hover:bg-purple-800 hover:text-gray-300", custom != null ? custom : "")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button