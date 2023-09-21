import {Link, NavLink, useNavigate} from "react-router-dom";
import NavItem from "../components/NavItem.jsx";
import useAccount from "../hooks/useAccount.jsx";
import Avatar from "../components/Avatar.jsx";
import {Menu, Transition} from '@headlessui/react'
import useAuthFeatures from "../hooks/useAuthFeatures.jsx";
import {useState} from "react";

const navigation = [
    {
        key: 1,
        name: 'Trang chủ',
        url: '/'
    },
    {
        key: 2,
        name: 'Sản phẩm',
        url: '/products'
    },
    {
        key: 3,
        name: 'Giỏ hàng',
        url: '/cart'
    },
]

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const account = useAccount()
    const { logout } = useAuthFeatures()
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)

    const icon = nav ? "uil-multiply" : "uil-bars"

    const handleClick = () => {
        logout()
        navigate("/")
    }

    return (
        <header className="flex flex-col md:flex-row items-center justify-between md:px-4 bg-stone-900 text-gray-50 sticky top-0 z-50">
            <div className="flex items-center md:justify-center justify-between w-full md:w-fit px-4 md:px-0">
                <Link to="/" className="flex justify-center items-center">
                    <h1 className="text-4xl text-purple-600 py-3 font-bold">
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
                    />
                    <i className="uil uil-search hover:text-purple-500 text-2xl ml-3 hover:cursor-pointer"></i>
                </div>
            </div>
            {
                nav &&
                <nav
                    id="mobile-nav"
                    className="flex md:hidden flex-col w-full"
                    onClick={() => setNav(false)}
                >
                    {
                        navigation.map(item =>
                            <NavItem url={item.url} key={item.key} isMobile={true}>
                                {item.name}
                            </NavItem>
                        )
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
                                    className="flex w-full items-center justify-center px-5 py-5 hover:text-purple-500"
                                    onClick={handleClick}
                                >
                                    Đăng xuất
                                </div>
                            </>
                    }
                </nav>
            }
            <nav id="nav" className="hidden md:flex flex-row">
                {
                    navigation.map(item =>
                        <NavItem url={item.url} key={item.key}>
                            {item.name}
                        </NavItem>
                    )
                }
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
                                <Avatar className="ml-3"/>
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
                                                <div
                                                    className="flex w-44 items-center justify-start px-3 py-2 hover:text-purple-500"
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