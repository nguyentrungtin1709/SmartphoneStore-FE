import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App />}
            errorElement={<h1>Error</h1>}
        >
        </Route>
    )
)