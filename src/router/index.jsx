import {createBrowserRouter, createRoutesFromElements, Route, useSearchParams} from "react-router-dom";
import RootPage from "../pages/RootPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Login from "../layouts/Login.jsx";
import Register from "../layouts/Register.jsx";
import Account from "../pages/Account.jsx";
import Home from "../layouts/Home.jsx";
import {useAxios} from "../hooks/useAxios.jsx";
import Smartphones from "../layouts/Smartphones.jsx";
import Smartphone from "../layouts/Smartphone.jsx";
import Profile from "../layouts/Profile.jsx";
import {EmailUpdating} from "../layouts/EmailUpdating.jsx";
import {PhoneUpdating} from "../layouts/PhoneUpdating.jsx";
import {PasswordUpdating} from "../layouts/PasswordUpdating.jsx";
import Address from "../layouts/Address.jsx";
import AddressView from "../layouts/AddressView.jsx";
import AddressForm from "../layouts/AddressForm.jsx";
import {AddressEdit} from "../layouts/AddressEdit.jsx";
import axios from "axios";
import {server} from "../utils/config.jsx";
import {Cart} from "../layouts/Cart.jsx";
import {PrivateRoute} from "../components/PrivateRoute.jsx";
import {Payment} from "../layouts/Payment.jsx";
import {AccountOrders} from "../layouts/AccountOrders.jsx";
import {OrderDetails} from "../layouts/OrderDetails.jsx";
import {Ratings} from "../layouts/Ratings.jsx";
import {RatingEdit} from "../layouts/RatingEdit.jsx";
import {Admin} from "../pages/Admin.jsx";
import {AdminRoute} from "../components/AdminRoute.jsx";
import {Customers} from "../layouts/Customers.jsx";
import theme from "tailwindcss/defaultTheme.js";
import {CustomerForm} from "../layouts/CustomerForm.jsx";
import {Customer} from "../layouts/Customer.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootPage/>} errorElement={<PageNotFound/>}>
            <Route
                index
                element={<Home />}
                loader={() => {
                    return useAxios()
                        .get("/api/v1/brands")
                        .then(response => response.data)
                }}
            />
            <Route
                path="admin"
                element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                }
            >
                <Route
                    path="customers"
                    element={<Customers/>}
                ></Route>
                <Route
                    path="customers/form"
                    element={<CustomerForm />}
                ></Route>
                <Route
                    path="customers/:customerId"
                    element={<Customer />}
                    loader={({ params }) => {
                        const token = localStorage.getItem("token")
                        const authAxios = axios.create({
                            baseURL: server,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                        return authAxios
                            .get(`/api/v1/admin/accounts/${params.customerId}`)
                            .then(response => response.data)
                    }}
                ></Route>
            </Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route
                path="account"
                element={<Account />}
            >
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                ></Route>
                <Route
                    path="ratings"
                    loader={({ request }) => {
                        const url = new URL(request.url)
                        const page = url.searchParams.get("page") || 0
                        const token = localStorage.getItem("token")
                        const authAxios = axios.create({
                            baseURL: server,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                        return authAxios
                            .get(`/api/v1/account/ratings?page=${page}`)
                            .then(response => response.data)
                            .catch(error => {
                                console.log(error)
                            })
                    }}
                    element={
                        <PrivateRoute>
                            <Ratings/>
                        </PrivateRoute>
                    }
                >
                </Route>
                <Route
                    path="ratings/:ratingId"
                    loader={({ params }) => {
                        const token = localStorage.getItem("token")
                        const authAxios = axios.create({
                            baseURL: server,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                        return authAxios
                            .get(`/api/v1/account/ratings/${params.ratingId}`)
                            .then(response => response.data)
                    }}
                    element={
                        <PrivateRoute>
                            <RatingEdit />
                        </PrivateRoute>
                    }
                >
                </Route>
                <Route
                    path="order"
                    element={<PrivateRoute>
                                <AccountOrders/>
                            </PrivateRoute>}
                >
                </Route>
                <Route
                    path="order/:orderId"
                    loader={({ params }) => {
                        const token = localStorage.getItem("token")
                        const authAxios = axios.create({
                            baseURL: server,
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                        return authAxios
                            .get(`/api/v1/account/order/${params.orderId}`)
                            .then(response => response.data)
                    }}
                    element={<PrivateRoute>
                                <OrderDetails />
                            </PrivateRoute>}
                >
                </Route>
                <Route path="profile/email" element={<EmailUpdating />} />
                <Route path="profile/phone" element={<PhoneUpdating />} />
                <Route path="profile/password" element={<PasswordUpdating />} />
                <Route path="address" element={<Address />}>
                    <Route index element={<AddressView />}/>
                    <Route
                        path="form"
                        element={<AddressForm />}
                    />
                    <Route
                        path="edit"
                        element={<AddressEdit/>}
                        loader={({ request }) => {
                            const url = new URL(request.url)
                            const addressId = url.searchParams.get("id")
                            const token = localStorage.getItem("token")
                            const authAxios = axios.create({
                                baseURL: server,
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                }
                            })
                            return authAxios
                                .get(`/api/v1/account/address/${addressId}`)
                                .then(response => response.data)
                        }}
                    />
                </Route>
            </Route>
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
            <Route
                path="cart"
                element={<Cart />}
            />
            <Route
                path="payment"
                element={
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                }
            >
            </Route>
        </Route>
    )
)