import useAccount from "../hooks/useAccount.jsx";
import {Navigate} from "react-router-dom";
export function AdminRoute({ children }) {
    const account = useAccount()
    return (account != null && account.role === "ADMIN" ? children : <Navigate to="/login" replace />)
}