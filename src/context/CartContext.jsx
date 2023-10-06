import {createContext, useEffect, useState} from "react";
import { setLocalCart, getLocalCart, removeLocalCart} from "../services/CartService.jsx";
import { useAxios } from "../hooks/useAxios.jsx";

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState(() => getLocalCart() || [])

    const setProductIntoCart = (smartphone, quantity) => {
        const isItem = cart.find(item => item.smartphone.id === smartphone.id)
        let newCart;
        if (isItem){
            newCart = cart.map(item => {
                        if (item.smartphone.id === smartphone.id) {
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
                    smartphone,
                    quantity
                }
            ]
        }
        setCart(newCart)
        setLocalCart(newCart)
    }

    const removeProductFromCart = (id) => {
        const newCart = cart.filter(item => item.smartphone.id !== id)
        setCart(newCart)
        if(newCart.length === 0){
            removeLocalCart()
        } else {
            setLocalCart(newCart)
        }
    }

    const clearCart = () => {
        setCart([])
        removeLocalCart()
    }

    return (
        <CartContext.Provider value={[cart, setProductIntoCart, removeProductFromCart, clearCart]}>
            {children}
        </CartContext.Provider>
    )
}