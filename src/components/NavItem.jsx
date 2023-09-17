import { NavLink } from "react-router-dom"


function NavItem({ children, url, isMobile }){
    let fullScreen = ""
    if(isMobile){
        fullScreen = " w-full"
    }
    const style = "px-5 py-5 text-gray-50 flex hover:bg-stone-800 hover:text-purple-500 justify-center" + fullScreen;
    return (
        <NavLink 
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? style :
                isActive ? "px-5 py-5 flex justify-center bg-stone-800 text-purple-500" + fullScreen :
                style
            }
        >
            {children}
        </NavLink>
    )
}

export default NavItem