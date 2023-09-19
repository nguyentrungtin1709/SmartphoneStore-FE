import Input from "./Input.jsx";

function Search({ className }){

    return (
        <div className={className}>
            <Input placeholder="Tìm kiếm sản phẩm" py="py-1" type="text"/>
            <i className="uil uil-search text-gray-50 hover:text-purple-500 text-2xl ml-3 hover:cursor-pointer"></i>
        </div>
    )
}

export default Search