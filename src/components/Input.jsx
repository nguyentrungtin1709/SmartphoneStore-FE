function Input({ placeholder }){
    return(
        <div className="flex items-center justify-center my-2">
            <label>
                <input
                    placeholder={placeholder}
                    className="outline-0 border-0 w-64 md:w-80 xl:w-96 px-2 py-2 rounded-lg bg-stone-700"
                />
            </label>
        </div>
    )
}

export default Input