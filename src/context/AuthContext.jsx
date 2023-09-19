import {createContext, useState} from "react";
import {removeAuthElementsLocalStorage, setAuthsLocalStorage} from "../services/AuthService.jsx";

export const AuthContext =  createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        return {
            account: JSON.parse(localStorage.getItem("account")),
            token: localStorage.getItem("token")
        }
    })

    const login = (account, token) => {
        setAuth({
            account,
            token
        })
        setAuthsLocalStorage(account, token)
    }

    const logout = () => {
        setAuth({
            account: null,
            token: null
        })
        removeAuthElementsLocalStorage()
    }

    const authFeatures = {
        login,
        logout
    }
    return (
        < AuthContext.Provider value={[auth, authFeatures]} >
            {children}
        </AuthContext.Provider>
    )
}