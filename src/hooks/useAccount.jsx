import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

export default function useAccount() {
    const [auth, authFeatures] = useContext(AuthContext)
    return auth.account;
}