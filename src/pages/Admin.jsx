import {Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {AdminInput} from "../components/AdminInput.jsx";
import {AdminButton} from "../components/AdminButton.jsx";

export function Admin() {
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main
                    className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 gap-1 bg-inherit text-gray-600"
                >
                    <div
                        className="md:col-span-1 flex flex-row md:flex-col flex-wrap px-3 py-3 bg-gray-50 border drop-shadow-md"
                    >
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname === "/admin" ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-dashboard"></i>
                                <span className="ml-1">
                            Bảng điều khiển
                        </span>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin/smartphones"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname.startsWith("/admin/smartphones") ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-mobile-android"></i>
                                <span className="ml-1">
                            Sản phẩm
                        </span>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin/customers"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname.startsWith("/admin/customers") ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-users-alt"></i>
                                <span className="ml-1">
                            Người dùng
                        </span>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin/orders"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname.startsWith("/admin/orders") ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-shopping-cart-alt"></i>
                                <span className="ml-1">
                            Đơn hàng
                        </span>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin/ratings"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname.startsWith("/admin/reviews") ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-favorite"></i>
                                <span className="ml-1">
                            Đánh giá
                        </span>
                            </Link>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-start md:w-full mx-1 my-1">
                            <Link
                                to="/admin/brands"
                                className={`flex flex-row w-full px-1 py-1 border rounded-md text-sm md:text-lg hover:text-purple-600 hover:bg-white ${location.pathname.startsWith("/admin/brands") ? "text-purple-600 bg-white" : ""}`}
                            >
                                <i className="uil uil-mobile-android-alt"></i>
                                <span className="ml-1">
                                    Thương hiệu
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="xl:col-span-6 lg:col-span-4 md:col-span-3 bg-gray-50 h-full border drop-shadow-md"
                    >
                        <Outlet/>
                    </div>
                </main>
            }
        </>
    )
}