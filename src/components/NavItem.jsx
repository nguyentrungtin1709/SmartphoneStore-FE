import { NavLink } from "react-router-dom"


function NavItem({ children, url }){
    const style = "px-5 py-5 text-gray-50 flex w-fit hover:bg-stone-800 hover:text-purple-500"
    return (
        <NavLink 
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? style :
                isActive ? "px-4 py-4 flex bg-stone-800 w-fit text-purple-500" :
                style
            }
        >
            {children}
        </NavLink>
    )
}

export default NavItem