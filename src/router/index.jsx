import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootPage from "../pages/root.jsx";
import PageNotFound from "../pages/404.jsx";
import Login from "../layouts/Login.jsx";
import Register from "../layouts/Register.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootPage/>} errorElement={<PageNotFound/>}>
            <Route index element={<h1 className="text-9xl text-purple-700">Hello</h1>} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
    )
)