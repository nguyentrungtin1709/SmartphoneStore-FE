import NavBar from "../components/NavBar.jsx";
import Logo from "../components/Logo.jsx";
import AuthGroup from "../components/AuthGroup.jsx";
import Search from "../components/Search.jsx";

export default function Header(){
    return (
        <header className="bg-stone-900 px-4 xl:flex items-center justify-between flex-grow">
            <div className="flex items-center">
                <Logo />
                <Search/>
            </div>
            <div className="flex items-center">

                <NavBar/>
                <AuthGroup/>
            </div>

        </header>
    )
}