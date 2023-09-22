import {Outlet} from "react-router-dom";
import App from "../App.jsx";
import Header from "../layouts/Header.jsx";
import Footer from "../layouts/Footer.jsx";

function RootPage(){
    return (
        <App>
            <Header/>
            <Outlet />
            <Footer />
        </App>
    )
}

export default RootPage