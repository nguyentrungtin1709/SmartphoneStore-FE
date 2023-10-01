export const setLocalCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const getLocalCart = () => {
    const data = localStorage.getItem("cart")
    return JSON.parse(data)
}

export const removeLocalCart = () => {
    localStorage.removeItem("cart")
}
