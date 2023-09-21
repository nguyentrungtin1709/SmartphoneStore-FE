import {Outlet} from "react-router-dom";
import App from "../App.jsx";
import Header from "../layouts/Header.jsx";

function RootPage(){
    return (
        <App>
            <Header/>
            <Outlet />
        </App>
    )
}

export default RootPage