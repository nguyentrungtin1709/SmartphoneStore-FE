import {useCart} from "../hooks/useCart.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "../components/Table.jsx";
import Quantity from "../components/Quantity.jsx";
import Rating from "@mui/material/Rating";

export function Cart() {
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const total = cart.reduce((result, item) => result + (item.smartphone.price * item.quantity), 0) || 0
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    },[])

    const handleUpdateQuantity = (product ,quantity, number) => {
        setProductIntoCart(product, quantity + number)
    }

    const handleIncrease = (product, quantity) => {
        handleUpdateQuantity(product, quantity, 1)
    }

    const handleDecrease = (product, quantity) => {
        if (quantity <= 1){
            removeProductFromCart(product.id)
        } else {
            handleUpdateQuantity(product, quantity, -1)
        }
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 min-h-screen gap-1 px-4 py-4 rounded-lg bg-gray-100 text-gray-600">
                    <section className="flex flex-col lg:col-span-2 xl:col-span-3 w-full min-h-full px-2 py-2 bg-white drop-shadow-xl">
                        <h1 className="text-4xl font-bold">
                            Giỏ hàng
                        </h1>
                        {cart.length === 0 ?
                            <div className="flex justify-center items-center w-full h-full">
                                <h1>Giỏ hàng không có sản phẩm</h1>
                            </div> :
                            <div className="flex flex-col justify-start mt-6">
                                {cart.map(item =>
                                    (<div
                                        key={item.smartphone.id}
                                        className="flex flex-col md:flex-row justify-between items-center px-3 py-3 border bg-white rounded-lg drop-shadow-md mt-3"
                                    >
                                        <div className="flex flex-row">
                                            <img
                                                src={item.smartphone.imageUrl}
                                                alt={item.smartphone.name}
                                                className="w-16 lg:w-28 xl:w-36"
                                            />
                                            <div className="flex flex-col ml-2 mt-2">
                                                <h3>
                                                    {item.smartphone.name}
                                                </h3>
                                                <span className="font-bold">
                                        {getPrice(item.smartphone.price)} <span className="underline">đ</span>
                                    </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center h-full justify-between py-2 mt-3 md:mt-0">
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="flex flex-row justify-center items-center">
                                                    <button
                                                        className="flex items-center justify-center px-2 py-1 border rounded-bl-xl rounded-tl-xl hover:text-white hover:bg-purple-500"
                                                        onClick={() => handleDecrease(item.smartphone, item.quantity)}
                                                    >
                                                        <i className="uil uil-minus"></i>
                                                    </button>
                                                    <div className="flex items-center justify-center px-3 py-1 border text-purple-600 font-bold">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        className="flex items-center justify-center px-2 py-1 border rounded-br-xl rounded-tr-xl hover:text-white hover:bg-purple-500"
                                                        onClick={() => handleIncrease(item.smartphone, item.quantity)}
                                                    >
                                                        <i className="uil uil-plus"></i>
                                                    </button>
                                                </div>
                                                <button
                                                    className="flex justify-center items-center ml-2 text-xl text-red-500 w-8 h-8 rounded-full hover:bg-gray-200 hover:text-red-700"
                                                    onClick={() => removeProductFromCart(item.smartphone.id)}
                                                >
                                                    <i className="uil uil-trash-alt"></i>
                                                </button>
                                            </div>
                                            <span className="text-red-500 mt-3">
                                                {getPrice(item.smartphone.price * item.quantity)} <span className="underline">đ</span>
                                            </span>
                                        </div>
                                    </div>)
                                )}
                            </div>}
                    </section>
                    <section className="flex flex-col h-fit px-2 py-2 rounded-lg drop-shadow-xl bg-white">
                        <div className="flex flex-row justify-between items-center w-full">
                            <h4 className="font-bold">
                                Số sản phẩm:
                            </h4>
                            <span>
                        {cart.length}
                    </span>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                            <h4 className="font-bold">
                                Tổng:
                            </h4>
                            <span className="font-bold text-red-500 mt-3">
                        {getPrice(total)} <span className="underline">đ</span>
                    </span>
                        </div>
                        {
                            cart.length === 0 ?
                                <p
                                    className="flex justify-center items-center px-4 py-2 rounded-lg bg-gray-400 cursor-pointer text-gray-50 mt-6"
                                >
                                    Đặt hàng
                                </p> :
                                <Link
                                    to="/payment"
                                    className="flex justify-center items-center px-4 py-2 rounded-lg bg-purple-600 text-gray-50 hover:bg-purple-800 hover:text-gray-300 mt-6"
                                >
                                    Mua hàng
                                </Link>
                        }

                    </section>
                </main>
            }
        </>
    )
}