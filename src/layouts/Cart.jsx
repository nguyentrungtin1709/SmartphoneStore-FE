import {useCart} from "../hooks/useCart.jsx";
import {useEffect} from "react";

export function Cart() {
    const [cart, setProductIntoCart, removeProductFromCart] = useCart()
    return (
        <></>
    )
}