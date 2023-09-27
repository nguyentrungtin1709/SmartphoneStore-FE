import {createContext, useState} from "react";
import {removeAuthElementsLocalStorage, setAuthsLocalStorage} from "../services/AuthService.jsx";
import account from "../pages/Account.jsx";

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

    const update = (account) => {
        setAuth({
            token: auth.token,
            account: account
        })
        setAuthsLocalStorage(account, auth.token)
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
        logout,
        update
    }
    return (
        < AuthContext.Provider value={[auth, authFeatures]} >
            {children}
        </AuthContext.Provider>
    )
}