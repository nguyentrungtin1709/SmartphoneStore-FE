import {Link} from "react-router-dom";

function Logo(){
    return (
        <Link to="/" className="flex items-center xl:mr-10 mr-5 px-3 py-3">
            {<h1 className="xl:text-4xl text-3xl text-purple-700 text-center">
                SPStore
            </h1>}
        </Link>
    )
}

export default Logo