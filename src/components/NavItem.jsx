import { NavLink } from "react-router-dom"


function NavItem({ children, url, isMobile }){
    let fullScreen = ""
    if(isMobile){
        fullScreen = "w-full"
    }
    const style = "flex justify-center px-5 py-5 text-gray-50  hover:bg-stone-800 hover:text-purple-500" + " " + fullScreen;
    return (
        <NavLink 
            to={url}
            className={({ isActive, isPending }) =>
                isPending ? style :
                isActive ? "flex justify-center px-5 py-5 bg-stone-800 text-purple-500" + " " + fullScreen :
                style
            }
        >
            {children}
        </NavLink>
    )
}

export default NavItem