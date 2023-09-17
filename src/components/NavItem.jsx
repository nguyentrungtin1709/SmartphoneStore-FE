import { NavLink } from "react-router-dom"


function NavItem({ content, url }){
    const style = "px-4 py-3 text-gray-50 flex w-fit hover:bg-stone-800 hover:text-cyan-600"
    return (
        <NavLink 
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? style :
                isActive ? "px-4 py-3 flex bg-stone-800 w-fit text-cyan-600" :
                style
            }
        >
            {content}
        </NavLink>
    )
}

export default NavItem