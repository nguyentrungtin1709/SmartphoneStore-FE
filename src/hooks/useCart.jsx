import {useContext} from "react";
import {CartContext} from "../context/CartContext.jsx";

export const useCart = () => {
    return useContext(CartContext)
}