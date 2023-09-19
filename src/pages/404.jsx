import {Link} from "react-router-dom";

function PageNotFound(){
    return (
        <div className="flex w-full h-full items-center justify-center pt-56">
            <h1 className="text-9xl text-purple-700 border-r-2 flex px-5">
                404
            </h1>
            <div className="flex flex-col px-5">
                <h1 className="text-3xl text-purple-700 flex">
                    Website không tồn tại
                </h1>
                <Link
                    to="/"
                    className="flex self-center mt-5 bg-purple-500 px-2 py-2 rounded-lg text-gray-50 hover:bg-purple-700"
                >
                    Trang chủ
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound