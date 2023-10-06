import useAccount from "../hooks/useAccount.jsx";
import {Navigate} from "react-router-dom";

export function PrivateRoute({ children }) {
    const account = useAccount()
    return (account != null ? children : <Navigate to="/login" replace />)
}
