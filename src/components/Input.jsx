function Input({ placeholder, onChange, type, value }){
    return(
        <div className="flex items-center justify-center my-4">
            <label>
                <input
                    placeholder={placeholder}
                    className="outline-0 border-0 w-64 md:w-80 xl:w-96 px-2 py-2 rounded-lg"
                    onChange={onChange}
                    type={type}
                    value={value}
                />
            </label>
        </div>
    )
}

export default Input