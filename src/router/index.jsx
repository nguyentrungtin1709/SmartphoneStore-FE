import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootPage from "../pages/RootPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Login from "../layouts/Login.jsx";
import Register from "../layouts/Register.jsx";
import Account from "../layouts/Account.jsx";
import Home from "../layouts/Home.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootPage/>} errorElement={<PageNotFound/>}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="account" element={<Account />}/>
        </Route>
    )
)