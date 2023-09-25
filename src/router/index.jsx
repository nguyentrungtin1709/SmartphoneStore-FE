import {createBrowserRouter, createRoutesFromElements, Route, useSearchParams} from "react-router-dom";
import RootPage from "../pages/RootPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Login from "../layouts/Login.jsx";
import Register from "../layouts/Register.jsx";
import Account from "../layouts/Account.jsx";
import Home from "../layouts/Home.jsx";
import {useAxios} from "../hooks/useAxios.jsx";
import Smartphones from "../layouts/Smartphones.jsx";
import Smartphone from "../layouts/Smartphone.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootPage/>} errorElement={<PageNotFound/>}>
            <Route
                index element={<Home />}
                loader={() => {
                    return useAxios()
                        .get("/api/v1/brands")
                        .then(response => response.data)
                }}
            />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="account" element={<Account />}/>
            <Route
                path="smartphones"
                element={<Smartphones/>}
                loader={({ request }) => {
                    const origin = new URL(request.url)
                    const searchParams = origin.searchParams
                    const key = searchParams.get("key")
                    const page = searchParams.get("page")
                    if (key != null) {
                        const url = `/api/v1/smartphones/search?key=${key}${page != null ? `&page=${page}` : ""}`
                        return useAxios()
                            .get(url)
                            .then(response => response.data)
                    }
                    const brand = searchParams.get("brand")
                    const min = searchParams.get("min")
                    const max = searchParams.get("max")
                    const sort = searchParams.get("sort")
                    const size = searchParams.get("size")
                    const url = `/api/v1/smartphones${page != null ? `?page=${page}` : "?page=0"}${brand != null ? `&brand=${brand}` : ""}${min != null ? `&min=${min}` : ""}${max != null ? `&max=${max}` : ""}${sort != null ? `&sort=${sort}` : ""}${size != null ? `&size=${size}` : ""}`
                    return useAxios()
                        .get(url)
                        .then(response => response.data)
                }}
            />
            <Route
                path="smartphones/:smartphoneId"
                element={<Smartphone />}
                loader={({ params }) => {
                    return useAxios()
                            .get(`/api/v1/smartphones/${params.smartphoneId}`)
                            .then(response => response.data)
                }}
            />
        </Route>
    )
)