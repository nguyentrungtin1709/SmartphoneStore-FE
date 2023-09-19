import axios from "axios";

const server = "http://localhost:8080"

export const loginRequest = async (email, password) => {
    return axios.post(server + "/api/v1/auth/login", {
        email: email,
        password: password
    })
}

export const signupRequest = async (name, email, password, phone) => {
    return axios.post(server + "/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        phone: phone
    })
}

export const setAuthsLocalStorage = (account, token) => {
    localStorage.removeItem("token")
    localStorage.removeItem("account")
    localStorage.setItem(
        "account",
        JSON.stringify(account)
    )
    localStorage.setItem(
        "token",
        token
    )
}


export const removeAuthElementsLocalStorage = () => {
    localStorage.removeItem("account")
    localStorage.removeItem("token")
}