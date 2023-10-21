import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getPrice} from "../../utils/getPrice.jsx";
import {AdminButton} from "../../components/AdminButton.jsx";

export function OrderView() {
    const [loading, setLoading] = useState(true)
    const param = useParams()
    const [order, setOrder] = useState()
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    const authAxios = useAuthAxios()

    useEffect(() => {
        authAxios
            .get(`/api/v1/admin/orders/${param.orderId}`)
            .then(response => {
                setOrder(response.data)
                setStatus(response.data.status)
            })
            .catch(error => {
                setOrder(null)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

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

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleUpdateOrderStatus = () => {
        authAxios
            .put(`/api/v1/admin/orders/${order.id}/status?status-value=${status}`)
            .then(response => {
                setOrder(response.data)
                setStatus(response.data.status)
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    const handleDeleteOrder = () => {
        authAxios
            .delete(`/api/v1/admin/orders/${order.id}`)
            .then(response => {
                navigate("/admin/orders")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <div
                    className="grid items-start auto-rows-min w-full h-full px-3 py-3"
                >
                    <Link
                        to="/admin/orders"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Đơn hàng
                    </Link>
                    {order == null ?
                        <div className="flex flex-row justify-center items-center w-full h-full">
                            <p>
                                Không tìm thấy đơn hàng
                            </p>
                        </div> :
                        <div className="flex flex-col w-full py-2 px-4">
                            <div className="flex flex-row justify-center items-center">
                                <h1 className="text-xl">
                                    Chi tiết đơn hàng
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 2xl:grid-cols-3 2xl:gap-2 my-2 w-full h-fit">
                                <div className="col-span-1 flex flex-col border rounded-md px-3 py-2">
                                    <div className="flex flex-row justify-center items-center my-3 font-bold text-purple-600">
                                        <h1>
                                            Thông tin khách hàng
                                        </h1>
                                    </div>
                                    <div className="flex flex-row">
                                        <span className="w-28 font-bold">
                                            Email:
                                        </span>
                                        <span>
                                            {order.account.email}
                                        </span>
                                    </div>
                                    <div className="flex flex-row">
                                        <span className="w-28 font-bold">
                                            Họ và tên:
                                        </span>
                                        <span>
                                            {order.account.name}
                                        </span>
                                    </div>
                                    <div className="flex flex-row">
                                        <span className="w-28 font-bold">
                                            Điện thoại:
                                        </span>
                                        <span>
                                            {order.account.phone}
                                        </span>
                                    </div>
                                    <div>
                                        <Link
                                            to={`/admin/customers/${order.account.id}`}
                                            className="flex flex-row justify-center items-center my-2 text-purple-600 hover:translate-x-2 hover:duration-500"
                                        >
                                            Thông tin chi tiết
                                            <i className="uil uil-arrow-right mx-1 text-lg"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col py-2 px-3 border rounded-md">
                                    <div
                                        className="flex flex-col w-full border-b pb-3"
                                    >
                                        <div className="flex flex-row">
                                            <span className="w-36 font-bold">
                                                Mã đơn hàng:
                                            </span>
                                            <span>
                                                {order.id}
                                            </span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-36 font-bold">
                                                Trạng thái:
                                            </span>
                                            {(order.status === "PENDING" || order.status === "PREPARING" || order.status === "DELIVERED") &&
                                                <span className="text-blue-400">
                                                    {getStatus(order.status)}
                                                </span>
                                            }
                                            {(order.status === "COMPLETED") &&
                                                <span className="text-green-500">
                                                    {getStatus(order.status)}
                                                </span>
                                            }
                                            {(order.status === "CANCELLED" || order.status === "RETURNED") &&
                                                <span className="text-red-500">
                                                    {getStatus(order.status)}
                                                </span>
                                            }
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-36 font-bold">
                                                Tổng số tiền:
                                            </span>
                                            <span>
                                                {getPrice(order.total)} đ
                                            </span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-36 font-bold">
                                                Ngày tạo:
                                            </span>
                                            <span>
                                                {getDate(order.createdAt)}
                                            </span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-36 font-bold">
                                                Địa chỉ:
                                            </span>
                                                <span>
                                                {`${order.city}, ${order.district}, ${order.commune}, ${order.addressDetails}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-2">
                                        {order.orderItemList.map(item =>
                                            <div key={item.id} className="flex flex-col md:flex-row md:justify-between px-2 py-2 my-2 border rounded-lg">
                                                <Link to={`/admin/smartphones/${item.smartphone.id}`} className="flex flex-row items-start">
                                                    <img src={item.smartphone.imageUrl} alt={item.smartphone.name} className="w-10 md:w-24 lg:w-32"/>
                                                    <div className="flex flex-col mx-1">
                                                        <h2>
                                                            {item.smartphone.name}
                                                        </h2>
                                                        <p>Số lượng: {item.quantity}</p>
                                                    </div>
                                                </Link>
                                                <p className="text-red-500">
                                                    Giá bán: {getPrice(item.price)}
                                                    <span className="underline ml-1">đ</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col h-56 border rounded-md">
                                <div className="flex flex-row w-full justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col md:flex-row md:justify-center md:items-center px-2 py-2">
                                        <span className="font-bold mx-2">
                                            Trạng thái:
                                        </span>
                                            <select
                                                className="flex border border-gray-400 rounded-lg mx-1 my-1 w-fit"
                                                value={status}
                                                onChange={e => {
                                                    setStatus(e.target.value)
                                                }}
                                            >
                                                <option
                                                    value="PENDING"
                                                >
                                                    Đang xử lý
                                                </option>
                                                <option
                                                    value="PREPARING"
                                                >
                                                    Đang chuẩn bị
                                                </option>
                                                <option
                                                    value="DELIVERED"
                                                >
                                                    Đang vận chuyển
                                                </option>
                                                <option
                                                    value="COMPLETED"
                                                >
                                                    Đã giao
                                                </option>
                                                <option
                                                    value="CANCELLED"
                                                >
                                                    Đã hủy
                                                </option>
                                                <option
                                                    value="RETURNED"
                                                >
                                                    Trả hàng
                                                </option>
                                            </select>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <AdminButton
                                                disabled={status === order.status}
                                                onClick={handleUpdateOrderStatus}
                                            >
                                                Cập nhật
                                            </AdminButton>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-center items-start py-9 md:py-3 mx-2">
                                        <button
                                            className="flex flex-row items-center justify-center w-fit h-fit text-lg px-2 py-1 border border-red-600 text-red-600 hover:bg-red-500 hover:text-white rounded-lg"
                                            onClick={handleDeleteOrder}
                                        >
                                            Xóa đơn hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}