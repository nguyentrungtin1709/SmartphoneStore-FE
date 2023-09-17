import {Link} from "react-router-dom";
import Search from "./Search.jsx";

function Logo(){
    return (
        <Link to="/" className="flex items-center mr-10">
            {<h1 className="text-4xl text-purple-700 text-center">
                SPStore
            </h1>}
        </Link>
    )
}

export default Logo