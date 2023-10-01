import {createContext, useEffect, useState} from "react";
import { setLocalCart, getLocalCart, removeLocalCart} from "../services/CartService.jsx";
import { useAxios } from "../hooks/useAxios.jsx";

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const localCart = getLocalCart() || []
        const cartList = []
        localCart.forEach(localItem => {
            useAxios()
                .get(`/api/v1/smartphones/${localItem.id}`)
                .then(response => {
                    cartList.push({
                        product: response.data,
                        quantity: localItem.quantity
                    })
                })
        })
        setCart(cartList)
    }, [])

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
        setLocalCart({
            id: product.id,
            quantity: quantity
        })
    }

    const removeProductFromCart = (id) => {
        const newCart = cart.filter(item => item.product.id !== id)
        setCart(newCart)
        if(newCart.length === 0){
            removeLocalCart()
        } else {
            const data = newCart.map(item => {
                return {
                    id: item.product.id,
                    quantity: item.quantity
                }
            })
            setLocalCart(data)
        }
    }

    return (
        <CartContext.Provider value={[cart, setProductIntoCart, removeProductFromCart]}>
            {children}
        </CartContext.Provider>
    )
}