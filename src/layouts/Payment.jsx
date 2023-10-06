import {useCart} from "../hooks/useCart.jsx";
import useAccount from "../hooks/useAccount.jsx";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {Link} from "react-router-dom";

export function Payment() {
    const account = useAccount()
    const authAxios = useAuthAxios()
    const [addressList, setAddressList] = useState([])
    const [addressIndex, setAddressIndex] = useState(0)
    const [cart, setProductIntoCart, removeProductFromCart] = useCart()

    useEffect(() => {
        authAxios
            .get("/api/v1/account/address")
            .then(response => {
                setAddressList(response.data)
            })
    }, [])

    const handleDeleteAddress = (addressId) => {
        authAxios
            .delete(`/api/v1/account/address/${addressId}`)
            .then(response => {
                setAddressList(
                    addressList.filter(address => address.id !== addressId)
                )
            })
    }

    return (
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
            </section>
        </main>
    )
}