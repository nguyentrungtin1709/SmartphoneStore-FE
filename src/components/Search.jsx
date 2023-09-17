import SearchIcon from '@mui/icons-material/Search'

function Search(){
    return (
        <div className="flex items-center justify-center">
            <input
                className="mr-4 outline-0 text-sm text-gray-300 bg-stone-800 rounded-lg flex py-1 w-80"
                placeholder="Tìm kiếm sản phẩm"
            />
            <SearchIcon className="text-gray-50 hover:text-purple-500"/>
        </div>
    )
}

export default Search