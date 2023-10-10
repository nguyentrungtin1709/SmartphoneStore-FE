import {useCart} from "../hooks/useCart.jsx";
import useAccount from "../hooks/useAccount.jsx";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {Link, useNavigate} from "react-router-dom";
import {getPrice} from "../utils/getPrice.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export function Payment() {
    const account = useAccount()
    const authAxios = useAuthAxios()
    const [addressList, setAddressList] = useState([])
    const [addressIndex, setAddressIndex] = useState(0)
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const navigate = useNavigate()
    const total = cart.reduce((result, item) => result + (item.smartphone.price * item.quantity), 0) || 0
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authAxios
            .get("/api/v1/account/address")
            .then(response => {
                setAddressList(response.data)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        if(cart.length === 0){
            navigate("/")
        }
    },[cart])

    const handleDeleteAddress = (addressId) => {
        authAxios
            .delete(`/api/v1/account/address/${addressId}`)
            .then(response => {
                setAddressList(
                    addressList.filter(address => address.id !== addressId)
                )
            })
    }

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

    const handleClickOrder = () => {
        const data = {
            account: account,
            city: addressList[addressIndex].city,
            district: addressList[addressIndex].district,
            commune: addressList[addressIndex].commune,
            addressDetails: addressList[addressIndex].addressDetails,
            orderItemList: cart
        }
        authAxios
            .post("/api/v1/account/order", data)
            .then(() => {
                clearCart()
                navigate("/")
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const handleCancelOrder = () => {
        clearCart()
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <main
                    className="flex flex-col justify-start items-center px-4 py-4 md:px-32 lg:px-44 xl:px-52 2xl:px-60 w-full min-h-screen bg-gray-100 text-gray-600"
                >
                    <h1 className="flex font-bold text-4xl mb-6">
                        Thanh toán
                    </h1>
                    <section className="flex flex-col w-full h-full bg-white rounded-lg drop-shadow-xl px-4 py-4">
                        <div className="flex flex-col justify-center items-start mt-3">
                            <h2 className="font-bold uppercase">
                                Thông tin khách hàng
                            </h2>
                            <div className="flex flex-col md:flex-row md:justify-between w-full mt-1 px-4">
                                <div className="flex flex-row justify-start items-center">
                            <span className="mr-3">
                                Họ và tên:
                            </span>
                                    <span className="text-purple-600">
                                {account.name}
                            </span>
                                </div>
                                <div className="flex flex-row justify-start items-center">
                            <span className="mr-3">
                                Số điện thoại:
                            </span>
                                    <span className="text-purple-600">
                                {account.phone}
                            </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-2">
                                <h2 className="font-bold uppercase mb-2">
                                    Địa chỉ giao hàng
                                </h2>
                                <div className="flex flex-col px-4 w-full">
                                    {addressList.length === 0 ?
                                        <p className="flex text-red-500 mt-2 mb-4">
                                            Hãy thêm địa chỉ nhận hàng
                                        </p> :
                                        addressList.map((address, index) =>
                                                <div key={index} className="flex flex-row justify-between my-2 items-center w-full">
                                                    <label className="flex items-center justify-between mb-3">
                                                        <input
                                                            name="payment-address"
                                                            type="radio"
                                                            value={index}
                                                            checked={addressIndex === index}
                                                            onChange={e => setAddressIndex(index)}
                                                        />
                                                        <span className="ml-2">
                                            {`${address.city}, ${address.district}, ${address.commune}, ${address.addressDetails}`}
                                        </span>
                                                    </label>
                                                    <div className="flex flex-col md:flex-row justify-between items-center">
                                                        <Link
                                                            to={`/account/address/edit?id=${address.id}`}
                                                            className="border text-yellow-600 border-yellow-500 px-2 py-1 rounded-lg hover:bg-yellow-500 hover:text-stone-900 md:mx-2"
                                                        >
                                                            <i className="uil uil-pen"></i>
                                                        </Link>
                                                        <button
                                                            className="text-red-500 border border-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white my-1 md:my-0 md:ml-2"
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                        >
                                                            <i className="uil uil-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                        )}
                                </div>
                                <Link
                                    to="/account/address/form"
                                    className="mx-4 hover:text-purple-600 w-fit hover:translate-x-4 duration-500"
                                >
                                    {addressList.length < 3 ? "Thêm địa chỉ" : "Cập nhật địa chỉ"}
                                    <i className="uil uil-arrow-right ml-1 text-md"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start mt-6">
                            {cart.map(item =>
                                (<div
                                    key={item.smartphone.id}
                                    className="flex flex-col md:flex-row justify-between items-center px-3 py-3 border border-stone-300 rounded-lg drop-shadow-2xl mt-3"
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
                                            <span>
                                        {getPrice(item.smartphone.price)} <span className="underline">đ</span>
                                    </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-3 md:mt-0">
                                        <div className="flex flex-row items-center">
                                            <div className="flex flex-row justify-center items-center">
                                                <button
                                                    className="flex items-center justify-center px-3 py-1 border rounded-bl-2xl rounded-tl-2xl hover:text-white hover:bg-purple-500"
                                                    onClick={() => handleDecrease(item.smartphone, item.quantity)}
                                                >
                                                    <i className="uil uil-minus"></i>
                                                </button>
                                                <div className="flex items-center justify-center px-4 py-1 border text-purple-600 font-bold">
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    className="flex items-center justify-center px-3 py-1 border rounded-br-2xl rounded-tr-2xl hover:text-white hover:bg-purple-500"
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
                        </div>
                        <div className="flex flex-row items-center mt-6 w-full">
                            <div className="flex flex-row items-center justify-between w-full">
                        <span className="font-bold">
                            Tổng tiền:
                        </span>
                                <span className="text-red-500 font-bold">
                            {getPrice(total)} <span className="underline">đ</span>
                        </span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center mt-6">
                            <button
                                className="flex justify-center items-center px-3 py-2 w-32 mx-1 rounded-lg bg-purple-600 text-gray-50 hover:bg-purple-800 hover:text-gray-300"
                                onClick={handleCancelOrder}
                            >
                                Hủy đơn hàng
                            </button>
                            <button
                                className="flex justify-center items-center px-3 py-2 w-32 mx-1 rounded-lg bg-purple-600 text-gray-50 hover:bg-purple-800 hover:text-gray-300 disabled:bg-gray-300 disabled:text-stone-900"
                                disabled={addressList.length === 0}
                                onClick={handleClickOrder}
                            >
                        <span className="flex items-center hover:translate-x-2 duration-500">
                            Đặt hàng
                            <i className="uil uil-shopping-cart-alt text-sm"></i>
                        </span>
                            </button>
                        </div>
                    </section>
                </main>
            }
        </>
    )
}