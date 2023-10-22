import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAuthAxios} from "../../hooks/useAuthAxios.jsx";
import {getPrice} from "../../utils/getPrice.jsx";
import {ViewButton} from "../../components/ViewButton.jsx";
import {UpdateButton} from "../../components/UpdateButton.jsx";
import {DeleteButton} from "../../components/DeleteButton.jsx";

export function OrdersView() {
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orders, setOrders] = useState()
    const [text, setText] = useState("")
    const authAxios = useAuthAxios()
    const page = searchParams.get("page")
    const status = searchParams.get("status")
    const [isProduct, setIsProduct] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    useEffect(() => {
        setIsProduct(true)
        setText("")
        if (status != null){
            authAxios
                .get(`/api/v1/admin/orders/status/${status}?page=${page == null ? "0" : page}`)
                .then(response => {
                    setOrders(response.data)
                })
        } else {
            authAxios
                .get(`/api/v1/admin/orders?page=${page == null ? "0" : page}`)
                .then(response => {
                    setOrders(response.data)
                })
        }
    }, [page, status]);

    const getDate = (date) => {
        const result = new Date(Date.parse(date))
        return `${result.toLocaleTimeString()} ${result.toLocaleDateString()}`
    }

    const handleSearch = () => {
        authAxios
            .get(`/api/v1/admin/orders/${text}`)
            .then(response => {
                const order = response.data
                navigate(`/admin/orders/${order.id}`)
            })
            .catch(error => {
                setIsProduct(false)
            })
    }

    const handleDeleteOrder = (orderId) => {
        authAxios
            .delete(`/api/v1/admin/orders/${orderId}`)
            .then(response => {
                if (status != null){
                    authAxios
                        .get(`/api/v1/admin/orders/status/${status}?page=${page == null ? "0" : page}`)
                        .then(response => {
                            setOrders(response.data)
                        })
                } else {
                    authAxios
                        .get(`/api/v1/admin/orders?page=${page == null ? "0" : page}`)
                        .then(response => {
                            setOrders(response.data)
                        })
                }
            })
            .catch(error => {
                console.log(error)
            })
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

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full h-full">
                    <CircularProgress />
                </div> :
                <div className="grid items-start auto-rows-min w-full h-full px-3 py-3">
                    <Link
                        to="/admin/orders"
                        className="flex flex-row justify-start items-center w-fit text-lg font-bold hover:text-purple-600"
                    >
                        Đơn hàng
                    </Link>
                    <div className="flex flex-col md:flex-row md:justify-between my-3">
                        <div
                            className="flex flex-row items-center"
                        >
                            <input
                                className="w-72 md:w-80 xl:w-96 px-2 py-1.5 h-fit border border-purple-600 rounded-tl-full rounded-bl-full"
                                placeholder="Hãy nhập mã đơn hàng"
                                type={"number"}
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <button
                                className="flex items-center px-2 py-1.5 text-purple-600 border border-purple-600 rounded-tr-full rounded-br-full hover:bg-purple-600 hover:text-white disabled:bg-inherit disabled:border-gray-400 disabled:text-gray-600"
                                disabled={text === ""}
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                        {
                            !isProduct &&
                            <div className="mb-4 my-2 px-2 text-red-500 flex md:hidden">
                                Không tìm thấy sản phẩm
                            </div>
                        }
                        <select
                            className="flex border border-gray-400 rounded-lg mx-1 my-1 w-fit"
                            onChange={e => {
                                const status = e.target.value
                                if (status === "ALL") {
                                    setSearchParams(prev => {
                                        prev.delete("status")
                                        return prev
                                    })
                                } else {
                                    setSearchParams(prev => {
                                        prev.set("status", status)
                                        return prev
                                    })
                                }
                            }}
                        >
                            <option
                                value="ALL"
                            >
                                Trạng thái
                            </option>
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
                    {
                        !isProduct &&
                        <div className="mb-4 px-2 text-red-500 hidden md:flex">
                            Không tìm thấy sản phẩm
                        </div>
                    }
                    {
                        orders?.content.length == 0 ?
                        <div className="flex flex-row justify-center items-center h-56">
                            <p>
                                Không có đơn hàng
                            </p>
                        </div> :
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 bg-white">
                                    <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Mã số
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Tên khách hàng
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Trạng thái
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Tổng đơn hàng
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Ngày tạo
                                        </th>
                                        <th scope="col" className="px-4 py-3">

                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders?.content.map(order =>
                                            <tr key={order.id} className="bg-white border-b">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                    {order.id}
                                                </th>
                                                <td className="px-4 py-3">
                                                    {order.account.email}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {order.account.name}
                                                </td>
                                                <td className="px-4 py-3">
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
                                                </td>
                                                <td className="px-4 py-3">
                                                    {getPrice(order.total)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {getDate(order.createdAt)}
                                                </td>
                                                <td className="flex flex-row px-4 py-3">
                                                    <ViewButton
                                                        url={`/admin/orders/${order.id}`}
                                                    />
                                                    <DeleteButton
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                        </table>
                        </div>
                    }
                    <div className="flex flex-row items-center justify-center w-full h-full my-3">
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${orders?.first ? "" : " hover:bg-purple-600 text-purple-600 hover:text-white hover:-translate-x-1 duration-500"}`}
                            disabled={orders?.first}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const prevPage = Number(curPage) - 1
                                setSearchParams(prev => {
                                    prev.set("page", prevPage)
                                    return prev
                                })
                            }}
                        >
                            <i className="uil uil-arrow-left"></i>
                        </button>
                        <span className="flex flex-row justify-center items-center px-4 py-1 border border-gray-400 rounded-lg mx-2">
                            {page == null ? "0" : page}
                        </span>
                        <button
                            className={`flex items-center justify-center text-2xl px-2 rounded-lg ${orders?.last ? "" : "hover:bg-purple-600 text-purple-600 hover:text-white hover:translate-x-1 duration-500"}`}
                            disabled={orders?.last}
                            onClick={() => {
                                const curPage = page == null ? "0" : page
                                const nextPage = Number(curPage) + 1
                                setSearchParams(prev => {
                                    prev.set("page", nextPage)
                                    return prev
                                })
                            }}
                        >
                            <i className="uil uil-arrow-right"></i>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}