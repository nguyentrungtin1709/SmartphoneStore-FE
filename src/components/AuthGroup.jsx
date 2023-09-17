import AuthLink from "./AuthLink.jsx";
import NavItem from "./NavItem.jsx";

function AuthGroup(){
    return (
        <div
            className="flex items-center"
        >
            <NavItem url="/login">
                Đăng nhập
            </NavItem>
            <NavItem url="/register">
                Đăng kí
            </NavItem>
        </div>
    )
}

export default AuthGroup