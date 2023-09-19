import NavItem from "./NavItem.jsx";
import AccountMenu from "./AccountMenu.jsx";
import {Fragment, useContext} from "react";
import useAccount from "../assets/hooks/useAccount.jsx";
import * as React from "react";
import useAuthFeatures from "../assets/hooks/useAuthFeatures.jsx";
import {useNavigate} from "react-router-dom";
function NavBar({ className, isMobile }){
    const navigate = useNavigate()
    const { logout } = useAuthFeatures()
    const account = useAccount()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <nav
            className={className}
        >
            <NavItem url="/" isMobile={isMobile}>
                Trang chủ
            </NavItem>
            <NavItem url="/smartphones" isMobile={isMobile}>
                Sản phẩm
            </NavItem>
            <NavItem url="/cart" isMobile={isMobile}>
                Giỏ hàng
            </NavItem>
            <NavItem url="/orders" isMobile={isMobile}>
                Đơn hàng
            </NavItem>
            {
                account == null ? (
                    <>
                        <NavItem url="/login" isMobile={isMobile}>
                            Đăng nhập
                        </NavItem>
                        <NavItem url="/register" isMobile={isMobile}>
                            Đăng kí
                        </NavItem>
                    </> ):
                    <>
                        <AccountMenu />
                        <div className="flex flex-col items-center justify-center w-full md:hidden">
                            <NavItem url="/account" isMobile={isMobile}>
                                Thông tin tài khoản
                            </NavItem>
                            <button
                                className="outline-0 border-0 px-5 py-5 text-gray-50 flex
                                hover:bg-stone-800 hover:text-purple-500 justify-center w-full"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </>

            }
        </nav>
    )
}

export default NavBar