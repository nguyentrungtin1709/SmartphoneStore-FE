import {Link, useLoaderData, useSearchParams} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {useEffect, useState} from "react";
import {getPrice} from "../utils/getPrice.jsx";

export function Customer() {
    const customer = useLoaderData()
    const authAxios = useAuthAxios()
    const [params, setParams] = useSearchParams()
    const [orders, setOrders] = useState([])
    const status = params.get("status")
    const page = params.get("page")
    const [first, setFirst] = useState(false)
    const [last, setLast] = useState(false)

    useEffect(() => {
        const page = params.get("page")
        const status = params.get("status")
        authAxios
            .get(`/api/v1/admin/accounts/${customer.id}/orders${page != null ? `?page=${page}` : "?page=0"}${status != null ? `&status=${status}` : ""}`)
            .then(response => {
                setOrders(response.data.content)
                setFirst(response.data.first)
                setLast(response.data.last)
            })
        window.scrollTo(0, 0)
    }, [status, page])

    const handleStatusFilter = (status) => {
        if (status == null){
            setParams({})
        } else {
            setParams({
                status: `${status}`
            })
        }
    }

    const getStatus = (status) => {
        switch (status){
            case "PENDING":
                return "Đang xử lý"
            case "PREPARING":
                return "Đang chuẩn bị"
            case "DELIVERED":
                return "Đang vận chuyển"
            case "COMPLETED":
                return "Đã giao"
            case "CANCELLED":
                return "Đã hủy"
            case "RETURNED":
                return "Trả hàng"
        }
    }

    const handlePagination = (value) => {
        const oldPage = page || "0"
        setParams({
            ...params,
            page: Number(oldPage) + value
        })
    }

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return result.toLocaleDateString()
    }

    const getDateTime = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    return (
        <div className="flex flex-col items-start w-full h-full px-3 py-3">
            <Link
                to="/admin/customers"
                className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
            >
                Người dùng
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-3 w-full lg:gap-2">
                <div className="flex flex-col col-span-1 py-1 px-6 border">
                    <div className="flex flex-row items-center justify-center w-full">
                        {customer.imageUrl == null ?
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100
                                }}
                            >
                                {customer.name[0]}
                            </Avatar> :
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100
                                }}
                                src={customer.imageUrl}
                            />
                        }
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Họ và tên:
                        </span>
                        <span className="text-purple-600">
                            {customer.name}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Địa chỉ email:
                        </span>
                        <span className="text-purple-600">
                            {customer.email}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Số điện thoại:
                        </span>
                        <span className="text-purple-600">
                            {customer.phone}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col col-span-1 py-1 px-6 border">
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Role:
                        </span>
                        <span className="text-purple-600">
                            {customer.role}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Ngày sinh:
                        </span>
                        <span className={`${customer.birthday == null ? "" : "text-purple-600"}`}>
                            {customer.birthday == null ? "Trống" : getDate(customer.birthday)}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Giới tính:
                        </span>
                        <span className={`${customer.gender == null ? "" : "text-purple-600"}`}>
                            {customer.gender == null ? "Trống" : customer.gender}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Ngày tạo:
                        </span>
                        <span className="text-purple-600">
                            {getDateTime(customer.createdAt)}
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full my-3">
                        <span className="font-bold">
                            Trạng thái:
                        </span>
                        <span className="text-purple-600">
                            {customer.enabled ? "Kích hoạt": "Không được kích hoạt"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="grid grid-cols-4 lg:grid-cols-7 gap-1 px-1 py-1 my-3 text-sm w-full bg-white border rounded-lg">
                    <div
                        className={`flex items-center justify-center ${status == null ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter(null)}
                        >
                            Tất cả
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "PENDING" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("PENDING")}
                        >
                            Đang xử lý
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "PREPARING" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("PREPARING")}
                        >
                            Đang chuẩn bị
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "DELIVERED" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("DELIVERED")}
                        >
                            Đang vận chuyển
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "COMPLETED" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("COMPLETED")}
                        >
                            Đã giao
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "CANCELLED" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("CANCELLED")}
                        >
                            Đã hủy
                        </button>
                    </div>
                    <div
                        className={`flex items-center justify-center ${status === "RETURNED" ? "py-1 font-bold text-purple-600 border-b border-b-purple-500" : ""}`}
                    >
                        <button
                            onClick={() => handleStatusFilter("RETURNED")}
                        >
                            Trả hàng
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full mb-6">
                    {orders.length === 0 &&
                        <div className="flex flex-row justify-center items-center w-full h-full">
                            Không có sản phẩm
                        </div>
                    }
                    {orders?.map(order => {
                        const date = new Date(Date.parse(order.createdAt))
                        const ordersList = order.orderItemList
                        return (<div key={order.id} className="flex flex-col bg-white w-full px-2 py-2 my-1 rounded-md">
                            <div className="flex flex-row justify-between items-center">
                                <h1>
                                    Trạng thái:
                                    <span className={`mx-1 ${order.status === "CANCELLED" || order.status === "RETURNED" ? "text-red-500" : "text-green-500"}`}>
                                            {getStatus(order.status)}
                                        </span>
                                </h1>
                                <h1 className="flex py-2 border-b border-b-gray-300">
                                    Ngày đặt hàng:
                                    <span className="mx-1 text-purple-600">
                                            {`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}
                                        </span>
                                </h1>
                            </div>
                            {ordersList.map(orderDetail =>
                                <div key={orderDetail.id} className="flex flex-col md:flex-row md:justify-between w-full py-2 my-1 border-b border-b-gray-200">
                                    <Link to={`/smartphones/${orderDetail.smartphone.id}`} className="flex flex-row">
                                        <div className="relative">
                                            <img
                                                src={orderDetail.smartphone.imageUrl}
                                                alt={orderDetail.smartphone.name}
                                                className="w-16"
                                            />
                                            <span className="absolute bottom-0 right-2 px-2 py-1 bg-gray-100 text-stone-900 rounded-tl-lg opacity-90">
                                                    {orderDetail.quantity}
                                                </span>
                                        </div>
                                        <div>
                                            <h2>{orderDetail.smartphone.name}</h2>
                                            <span className="flex md:hidden text-red-500">
                                                    {getPrice(orderDetail.price)} <span className="underline ml-1">đ</span>
                                                </span>
                                        </div>
                                    </Link>
                                    <div className="hidden md:flex flex-row text-red-500">
                                        {getPrice(orderDetail.price)} <span className="underline ml-1">đ</span>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col md:flex-row items-center md:justify-between mt-2">
                                <h3 className="font-bold text-red-500 mb-3 md:mb-0">
                                    Tổng tiền: {getPrice(order.total)} <span className="underline ml-1">đ</span>
                                </h3>
                                <div className="flex flex-row items-center">
                                    <Link
                                        to={`/admin/orders/${order.id}`}
                                        className="flex text-purple-600 border-purple-600 border px-2 py-1 rounded-lg hover:bg-purple-600 hover:text-white"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
                <div className="flex flex-row items-center justify-center w-full absolute bottom-0">
                    <button
                        className={`flex items-center justify-center text-2xl px-2 rounded-lg ${first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                        disabled={first}
                        onClick={() => handlePagination(-1)}
                    >
                        <i className="uil uil-arrow-left"></i>
                    </button>
                    <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                        {page == null ? 0 : page}
                    </span>
                    <button
                        className={`flex items-center justify-center text-2xl px-2 rounded-lg ${last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                        disabled={last}
                        onClick={() => handlePagination(1)}
                    >
                        <i className="uil uil-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}