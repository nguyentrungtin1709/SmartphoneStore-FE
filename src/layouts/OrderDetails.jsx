import {Link, useLoaderData} from "react-router-dom";
import {useEffect} from "react";
import {getPrice} from "../utils/getPrice.jsx";

export function OrderDetails() {
    const order = useLoaderData()
    const date = new Date(Date.parse(order.createdAt))

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
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <section
            className="flex flex-col xl:col-span-2 rounded-lg bg-white text-gray-600 px-1 py-1 md:px-4 md:py-4 md:min-h-screen"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-lg md:text-xl">
                        Chi tiết đơn hàng
                    <span className="mx-1">
                        #{order.id}
                    </span>
                        <span className="mx-1">
                        -
                    </span>
                        <span className={`mx-1 ${order.status === "CANCELLED" || order.status === "RETURNED" ? "text-red-500" : "text-green-500"}`}>
                        {getStatus(order.status)}
                    </span>
                </h1>
                <p>
                    Ngày đặt hàng:
                    <span className="mx-1 text-purple-600">
                        {`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}
                    </span>
                </p>
            </div>
            <div className="flex flex-col px-2 py-2 border-2 rounded-lg my-2">
                <h1 className="text-lg">
                    Địa chỉ người nhận
                </h1>
                <p>Họ và tên: {order.account.name}</p>
                <p>Số điện thoại: {order.account.phone}</p>
                <p>Địa chỉ: {`${order.city}, ${order.district}, ${order.commune}, ${order.addressDetails}`}</p>
            </div>
            <div className="flex flex-col py-2">
                {order.orderItemList.map(item =>
                    <div key={item.id} className="flex flex-col md:flex-row md:justify-between px-2 py-2 my-2 border rounded-lg">
                        <Link to={`/smartphones/${item.smartphone.id}`} className="flex flex-row items-start">
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
            <div className="flex flex-row justify-end my-4 font-bold text-red-500">
                    <p>
                        Tổng cộng: {getPrice(order.total)}
                        <span className="underline ml-1">đ</span>
                    </p>
            </div>
        </section>
    )
}