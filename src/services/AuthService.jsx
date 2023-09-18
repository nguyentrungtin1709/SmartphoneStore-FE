import axios from "axios";

const server = "http://localhost:8080"

export const login = async (email, password) => {
    return axios.post(server + "/api/v1/auth/login", {
        email: email,
        password: password
    })
}

export const signup = async (name, email, password, phone) => {
    return axios.post(server + "/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        phone: phone
    })
}

export const setAuth = (user, token) => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    )
    localStorage.setItem(
        "token",
        JSON.stringify(token)
    )
}

export const getToken = () => localStorage.getItem("user")

export const getUser = () => JSON.parse(
    localStorage.getItem("user")
)