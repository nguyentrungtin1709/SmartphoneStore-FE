import { NavLink } from "react-router-dom"


function NavItem({ children, url, isMobile }, key){

    const w_full = isMobile ? "w-full" : "";

    const style = "flex justify-center px-5 py-5 hover:text-purple-500" + " " + w_full;
    return (
        <NavLink 
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? style :
                isActive ? "flex justify-center px-5 py-5 bg-stone-800 text-purple-500" + " " + w_full:
                style
            }
            key={key}
        >
            {children}
        </NavLink>
    )
}

export default NavItem