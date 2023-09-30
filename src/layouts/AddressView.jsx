import {Link, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";


export default function AddressView() {

    const [addressList, setAddressList] = useState([])
    const [account] = useOutletContext()
    const authAxios = useAuthAxios()
    const disable = addressList.length >= 3

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
        <>
            <div className="flex flex-row items-center justify-between w-full mt-8 bg-white rounded-lg">
                <div
                    className={`flex justify-center items-center px-2 py-2 md:px-0 md:py-3 rounded-lg w-full ${disable ? "bg-gray-200" : "cursor-pointer text-purple-600 border border-purple-600 hover:bg-purple-600 hover:text-white"}`}
                >
                    {
                        disable ?
                        <p
                            className={`${disable ? "cursor-default": "w-full"} flex items-center justify-center`}
                        >
                            <i className="uil uil-plus text-2xl mr-2"></i>
                            Thêm địa chỉ mới
                        </p> :
                        <Link
                            to="/account/address/form"
                            className={`${disable ? "cursor-default": "w-full"} flex items-center justify-center`}
                        >
                            <i className="uil uil-plus text-2xl mr-2"></i>
                            Thêm địa chỉ mới
                        </Link>
                    }
                </div>
            </div>
            {addressList.map(address =>
                <div
                    key={address.id}
                    className="flex flex-col lg:flex-row items-center justify-between mt-8 px-3 py-3 bg-white rounded-lg border-2 md:border-0"
                >
                    <div>
                        <h3 className="font-bold">
                            {account.name}
                        </h3>
                        <div className="flex flex-col lg:flex-row justify-start items-center mt-1">
                            <span className="font-semibold w-full lg:mr-2 lg:w-fit">
                                Địa chỉ:
                            </span>
                            <p>
                                {`${address.city}, ${address.district}, ${address.commune}, ${address.addressDetails}`}
                            </p>
                        </div>
                        <div className="flex flex-row justify-start items-center mt-1">
                            <span className="font-semibold mr-2">
                                Điện thoại:
                            </span>
                            <p>
                                {account.phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 lg:mt-0">
                        <Link
                            to={`/account/address/edit?id=${address.id}`}
                            className="border text-yellow-600 border-yellow-500 px-2 py-1 rounded-lg hover:bg-yellow-500 hover:text-stone-900 mx-2"
                        >
                            Chỉnh sửa
                        </Link>
                        <button
                            className="text-red-500 border border-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white mx-2"
                            onClick={() => handleDeleteAddress(address.id)}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}