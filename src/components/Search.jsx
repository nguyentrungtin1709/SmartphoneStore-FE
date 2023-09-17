function Search({ className }){

    return (
        <div className={className}>
            <input
                className="mr-4 outline-0 text-sm text-gray-300 bg-stone-800 rounded-lg flex py-1 px-1 w-52"
                placeholder="Tìm kiếm sản phẩm"
            />
            <i className="uil uil-search text-gray-50 hover:text-purple-500 text-2xl"></i>
        </div>
    )
}

export default Search