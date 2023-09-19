import Header from "../layouts/Header.jsx";
import {Outlet} from "react-router-dom";
import App from "../App.jsx";

function RootPage(){
    return (
        <App>
            <Header/>
            <main className="bg-neutral-100 text-stone-900">
                <Outlet />
            </main>
        </App>
    )
}

export default RootPage