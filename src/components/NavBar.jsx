import NavItem from "./NavItem.jsx";
function NavBar({ className, isMobile }){
    return (
        <nav
            className={className}
        >
            <NavItem url="/" isMobile={isMobile}>
                Trang chủ
            </NavItem>
            <NavItem url="/smartphones" isMobile={isMobile}>
                Sản phẩm
            </NavItem>
            <NavItem url="/cart" isMobile={isMobile}>
                Giỏ hàng
            </NavItem>
            <NavItem url="/orders" isMobile={isMobile}>
                Đơn hàng
            </NavItem>
            <NavItem url="/login" isMobile={isMobile}>
                Đăng nhập
            </NavItem>
            <NavItem url="/register" isMobile={isMobile}>
                Đăng kí
            </NavItem>
        </nav>
    )
}

export default NavBar