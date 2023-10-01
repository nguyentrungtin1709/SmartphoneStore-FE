import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

export default function useToken() {
    const [auth] = useContext(AuthContext)
    return auth.token;
}