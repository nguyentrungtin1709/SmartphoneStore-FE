import { classNames } from "../utils/classNames.jsx";

function Input({ placeholder, onChange, type, value, className }){
    return(
        <div className="flex items-center justify-center my-3">
                <input
                    placeholder={placeholder}
                    className={classNames("outline-0 w-64 md:w-80 xl:w-96 px-2 rounded-lg border border-stone-700 focus:border-purple-400 py-2", className)}
                    onChange={onChange}
                    type={type}
                    value={value}
                />
        </div>
    )
}

export default Input