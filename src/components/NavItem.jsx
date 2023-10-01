import {NavLink, useLocation} from "react-router-dom"


function NavItem({ children, url, isMobile }, key){
    const location = useLocation()

    return (
        <NavLink 
            to={url}
            className={`flex justify-center px-5 py-6 ${isMobile ? "w-full" : ""} ${location.pathname === url ? "bg-stone-800 text-purple-500" : "hover:text-purple-500"}`}
            key={key}
        >
            {children}
        </NavLink>
    )
}

export default NavItem