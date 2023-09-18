function Button({ children, custom, onClick }){
    if (custom == null){
        custom = ""
    }
    return (
        <button
            className={"flex items-center mx-2 my-2 px-4 py-2 rounded-lg bg-purple-600 text-gray-50" + " " +
            "hover:bg-purple-800 hover:text-gray-300" + " " + custom }
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button