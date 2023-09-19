import NavBar from "../components/NavBar.jsx";
import Logo from "../components/Logo.jsx";
import Search from "../components/Search.jsx";
import {useState} from "react";

export default function Header(){
    const [nav, setNav] = useState(false)
    const clickHandler = () => {
        setNav(!nav)
    }
    return (
        <header
            className="flex flex-col bg-stone-900 w-full sticky z-50"
        >
            <div className="flex xl:flex-row md:flex-col flex-grow
                items-center justify-between px-4">
                <div className="flex items-center">
                    <Logo />
                    <Search className="md:flex items-center hidden"/>
                </div>
                <i
                    className="uil uil-bars md:hidden flex text-gray-50 hover:text-purple-500 text-2xl"
                    onClick={clickHandler}
                ></i>
                <NavBar className="md:flex items-center hidden"/>
            </div>
            {
                nav &&
                <div
                    className="md:hidden"
                    onClick={clickHandler}
                >
                    <NavBar className="md:hidden flex flex-col items-center w-full" isMobile={true}/>
                </div>
            }
        </header>

    )
}