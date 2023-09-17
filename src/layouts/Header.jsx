import NavItem from "../components/NavItem";

export default function Header(){
    return (
        <header className="bg-stone-900 flex items-center">
            <NavItem content="Home" url="/"/>
            <NavItem content="Sản phẩm" url="/home" />
        </header>
    )
}