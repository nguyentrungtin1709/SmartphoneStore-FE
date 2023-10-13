import {Link, NavLink, useNavigate} from "react-router-dom";
import NavItem from "../components/NavItem.jsx";
import useAccount from "../hooks/useAccount.jsx";
import Avatar from "../components/AccountAvatar.jsx";
import {Menu, Transition} from '@headlessui/react'
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import {useState} from "react";
import {useCart} from "../hooks/useCart.jsx";

const authNav = [
    {
        key: 4,
        name: 'Đăng nhập',
        url: '/login'
    },
    {
        key: 5,
        name: 'Đăng ký',
        url: '/register'
    }
]

export default function Header() {
    const account = useAccount()
    const { logout } = useAuthFeatures()
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)
    const [searchContent, setSearchContent] = useState("")
    const regEx = new RegExp("^[a-zA-Z0-9\\s]+$")
    const isValidSearchContent = regEx.test(searchContent)
    const [cart, setProductIntoCart, removeProductFromCart, clearCart] = useCart()
    const icon = nav ? "uil-multiply" : "uil-bars"

    const handleClick = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="flex flex-col md:flex-row items-center justify-between md:px-4 bg-stone-900 text-gray-50 sticky top-0 z-50">
            <div className="flex items-center md:justify-center justify-between w-full md:w-fit px-4 md:px-0">
                <Link to="/" className="flex justify-center items-center">
                    <h1 className="text-4xl text-purple-600 py-4 font-bold">
                        SPStore
                    </h1>
                </Link>
                <div className="flex md:hidden">
                    <i
                        className={"uil text-4xl hover:text-purple-500" + " " +  icon }
                        onClick={() => setNav(!nav)}
                    >
                    </i>
                </div>
                <div className="hidden xl:flex flex-row justify-between items-center ml-3">
                    <input
                        className="outline-0 w-64 md:w-80 xl:w-96 px-2 rounded-lg border bg-stone-800 border-stone-800 focus:border-purple-400 py-1"
                        placeholder="Tìm kiếm sản phẩm"
                        value={searchContent}
                        onChange={e => setSearchContent(e.target.value)}
                    />
                    <button
                        className="flex justify-center items-center rounded-full hover:bg-stone-700 hover:text-purple-500 mx-2 w-10 h-10 disabled:text-gray-500"
                        onClick={() => {
                            navigate(`/smartphones?key=${searchContent}`)
                        }}
                        disabled={searchContent === "" || !isValidSearchContent}
                    >
                        <i
                            className="uil uil-search text-2xl hover:cursor-pointer"
                        >
                        </i>
                    </button>
                </div>
            </div>
            {
                nav &&
                <nav
                    id="mobile-nav"
                    className="flex md:hidden flex-col w-full"
                    onClick={() => setNav(false)}
                >
                    <NavItem url="/" isMobile={true}>
                        Trang chủ
                    </NavItem>
                    <NavItem url="/smartphones" isMobile={true}>
                        Sản phẩm
                    </NavItem>
                    {(account != null && account.role === "ADMIN") ?
                        <NavItem url="/admin" isMobile={true}>
                            Bảng điều khiển
                        </NavItem>:
                        <NavItem url="/cart" isMobile={true}>
                            Giỏ hàng
                        </NavItem>
                    }
                    {
                        account == null ?
                            <>
                                {
                                    authNav.map(item =>
                                        <NavItem url={item.url} key={item.key} isMobile={true}>
                                            {item.name}
                                        </NavItem>
                                    )
                                }
                            </> :
                            <>
                                <NavItem url="/account" isMobile={true}>
                                    Thông tin tài khoản
                                </NavItem>
                                <div
                                    className="flex w-full items-center justify-center px-5 py-5 hover:text-purple-500 cursor-pointer"
                                    onClick={handleClick}
                                >
                                    Đăng xuất
                                </div>
                            </>
                    }
                </nav>
            }
            <nav id="nav" className="hidden md:flex flex-row">
                <NavItem url="/">
                    Trang chủ
                </NavItem>
                <NavItem url="/smartphones">
                    Sản phẩm
                </NavItem>
                <div className="relative">
                    {(account != null && account.role === "ADMIN") ?
                        <NavItem url="/admin">
                            Bảng điều khiển
                        </NavItem> :
                        <NavItem url="/cart">
                            Giỏ hàng
                        </NavItem>
                    }
                    {
                        cart.length > 0 &&
                        <div className="absolute top-2 right-0 hidden md:flex justify-center items-center w-6 h-6 rounded-full bg-purple-600">
                            <span className="text-sm">
                                {cart.length}
                            </span>
                        </div>
                    }
                </div>
                {
                    account == null ?
                    <>
                        {
                            authNav.map(item =>
                                <NavItem url={item.url} key={item.key}>
                                    {item.name}
                                </NavItem>
                            )
                        }
                    </> :
                    <div className="relative flex items-center justify-center z-50">
                        <Menu>
                            <Menu.Button>
                                    <Avatar className="ml-3 mr-3"/>
                            </Menu.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items>
                                    <div className="flex flex-col bg-white text-stone-900 absolute right-0 top-6 rounded-md">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    to="/account"
                                                     className="flex w-44 items-center justify-start px-3 py-2 border-b-stone-400 border-b hover:text-purple-500"
                                                >
                                                    Thông tin tài khoản
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                (account != null && account.role === "ADMIN") ?
                                                    <NavLink
                                                        to="/admin"
                                                        className="flex w-44 items-center justify-start px-3 py-2 border-b-stone-400 border-b hover:text-purple-500"
                                                    >
                                                        Bảng điều khiển
                                                    </NavLink> :
                                                    <NavLink
                                                        to="/account/order"
                                                        className="flex w-44 items-center justify-start px-3 py-2 border-b-stone-400 border-b hover:text-purple-500"
                                                    >
                                                        Đơn hàng của tôi
                                                    </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className="flex w-44 items-center justify-start px-3 py-2 hover:text-purple-500 cursor-pointer"
                                                    onClick={handleClick}
                                                >
                                                    Đăng xuất
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                }
            </nav>
        </header>
    )
}