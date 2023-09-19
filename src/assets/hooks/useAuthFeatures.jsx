import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

export default function useAuthFeatures() {
    const [auth, authFeatures] = useContext(AuthContext)
    return authFeatures
}