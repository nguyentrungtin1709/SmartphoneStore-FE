import {createContext, useEffect, useState} from "react";
import { setLocalCart, getLocalCart, removeLocalCart} from "../services/CartService.jsx";
import { useAxios } from "../hooks/useAxios.jsx";

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState(() => getLocalCart() || [])

    const setProductIntoCart = (product, quantity) => {
        const isItem = cart.find(item => item.product.id === product.id)
        let newCart;
        if (isItem){
            newCart = cart.map(item => {
                        if (item.product.id === product.id) {
                            return {
                                ...item,
                                quantity: quantity
                            }
                        }
                        return item
                    })
        } else {
            newCart = [
                ...cart,
                {
                    product,
                    quantity
                }
            ]
        }
        setCart(newCart)
        setLocalCart(newCart)
    }

    const removeProductFromCart = (id) => {
        const newCart = cart.filter(item => item.product.id !== id)
        setCart(newCart)
        if(newCart.length === 0){
            removeLocalCart()
        } else {
            setLocalCart(newCart)
        }
    }

    return (
        <CartContext.Provider value={[cart, setProductIntoCart, removeProductFromCart]}>
            {children}
        </CartContext.Provider>
    )
}