import { NavLink } from "react-router-dom";

function PageNotFound(){
    return (
        <main className="grid h-screen place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-4xl font-semibold text-purple-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">PAGE NOT FOUND</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Xin lỗi, chúng tôi không tìm thấy trang web bạn đang tìm kiếm.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to="/"
                        className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-gray-50 shadow-sm hover:text-gray-200 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-purple-600"
                    >
                        Đến trang chủ
                    </NavLink>
                </div>
            </div>
        </main>
    )
}

export default PageNotFound