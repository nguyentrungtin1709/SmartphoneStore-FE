import NavItem from "./NavItem.jsx";
function NavBar(){
    return (
        <nav
            className="flex items-center"
        >
            <NavItem url="/">
                Trang chủ
            </NavItem>
            <NavItem url="/smartphones">
                Sản phẩm
            </NavItem>
            <NavItem url="/cart">
                Giỏ hàng
            </NavItem>
            <NavItem url="/orders">
                Đơn hàng
            </NavItem>
        </nav>
    )
}

export default NavBar