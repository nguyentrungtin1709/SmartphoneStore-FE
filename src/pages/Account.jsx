import {useEffect, useState} from "react";
import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import Avatar from "../components/AccountAvatar.jsx";
import {NavLink, Outlet} from "react-router-dom";
import useAccount from "../hooks/useAccount.jsx";

function Account(){
    const localAccountData = useAccount()
    const [account, setAccount] = useState(localAccountData)
    const authAxios = useAuthAxios()
    useEffect(() => {
        authAxios.get("/api/v1/account/profile")
            .then(response => {
                setAccount(response.data)
            })
            .catch(error => {
                console.log(error.response.status)
            })
    }, []);
    return (
        <>
            <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-5 gap-2 justify-center items-center xl:min-h-screen w-full md:px-8 md:py-6 xl:px-12 xl:py-12 bg-gray-100 text-gray-600">
                <div className="flex flex-col bg-white rounded-lg h-full w-full">
                    <div className="flex flex-row items-center w-full px-2 py-2 my-1">
                        <Avatar />
                        <div className="flex flex-col ml-2">
                            <p className="text-sm">
                                Tài khoản của
                            </p>
                            <p className="text-lg">
                                {account?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center w-full my-1">
                        <NavLink
                            to="/account"
                            className={({ isActive, isPending }) =>
                                isPending ? "px-2 py-2 w-full rounded-sm"
                                : isActive ? "px-2 py-2 bg-gray-200 w-full rounded-sm"
                                : "px-2 py-2 w-full rounded-sm"
                            }
                        >
                            <i className="uil uil-user text-2xl mx-2"></i>
                            Thông tin tài khoản
                        </NavLink>
                    </div>
                    <div className="flex flex-row items-center w-full my-1">
                        <NavLink
                            to="/account/order"
                            className={({ isActive, isPending }) =>
                                isPending ? "px-2 py-2 w-full rounded-sm"
                                    : isActive ? "px-2 py-2 bg-gray-200 w-full rounded-sm"
                                        : "px-2 py-2 w-full rounded-sm"
                            }
                        >
                            <i className="uil uil-book text-2xl mx-2"></i>
                            Quản lý đơn hàng
                        </NavLink>
                    </div>
                    <div className="flex flex-row items-center w-full my-1">
                        <NavLink
                            to="/account/address"
                            className={({ isActive, isPending }) =>
                                isPending ? "px-2 py-2 w-full rounded-sm"
                                    : isActive ? "px-2 py-2 bg-gray-200 w-full rounded-sm"
                                        : "px-2 py-2 w-full rounded-sm"
                            }
                        >
                            <i className="uil uil-map-marker-alt text-2xl mx-2"></i>
                            Sổ địa chỉ
                        </NavLink>
                    </div>
                </div>
                <div className="md:min-h-screen md:col-span-2 xl:col-span-4 grid md:grid-cols-1 xl:grid-cols-2 rounded-md gap-1">
                    <Outlet context={[account, setAccount]}/>
                </div>
            </div>
            <div className="flex md:hidden flex-col w-full">
                <div className="flex items-center justify-center bg-purple-500 py-4">
                    <h1 className="text-xl font-bold text-white">
                        Quản lý tài khoản
                    </h1>
                </div>
                <div className="flex flex-row w-full items-center border-b border-stone-400">
                    <NavLink
                        to="/account"
                        className={({ isActive, isPending }) =>
                            isPending ? "px-2 py-2 w-full rounded-sm"
                            : isActive ? "px-2 py-2 text-purple-600 font-bold border-x border-stone-400 w-1/3 flex justify-center"
                            : "px-2 py-2 text-white font-bold border-x border-stone-400 w-1/3 flex justify-center"
                        }
                    >
                        Hồ sơ
                    </NavLink>
                    <NavLink
                        to="/account/order"
                        className={({ isActive, isPending }) =>
                            isPending ? "px-2 py-2 w-full rounded-sm"
                                : isActive ? "px-2 py-2 text-purple-600 font-bold border-x border-stone-400 w-1/3 flex justify-center"
                                    : "px-2 py-2 text-stone-900 font-bold border-x border-stone-400 w-1/3 flex justify-center"
                        }
                    >
                        Đơn hàng
                    </NavLink>
                    <NavLink
                        to="/account/address"
                        className={({ isActive, isPending }) =>
                            isPending ? "px-2 py-2 w-full rounded-sm"
                                : isActive ? "px-2 py-2 text-purple-600 font-bold border-x border-stone-400 w-1/3 flex justify-center"
                                    : "px-2 py-2 text-stone-900 font-bold border-x border-stone-400 w-1/3 flex justify-center"
                        }
                    >
                        Sổ địa chỉ
                    </NavLink>
                </div>
                <div className="flex flex-col w-full">
                    <Outlet context={[account, setAccount]}/>
                </div>
            </div>
        </>
    )
}

export default Account