function Button({ children, custom }){
    if (custom){
        custom = ""
    }
    return (
        <button
            className={"flex items-center mx-2 my-2 px-4 py-2 rounded-lg bg-purple-600" + " " +
            "hover:bg-purple-800 hover:text-gray-300" + custom }
        >
            {children}
        </button>
    )
}

export default Button