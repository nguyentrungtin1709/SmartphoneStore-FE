import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import useToken from "../hooks/useToken.jsx";
import error from "../components/Error.jsx";

function Account(){
    const [account, setAccount] = useState()
    const authAxios = useAuthAxios()
    useEffect(() => {
        authAxios.get("/api/v1/account/profile")
            .then(response => {
                setAccount(response.data)
            })
            .catch(error => {
                console.log(error.response.status)
            })

    }, []);
    return (
        <main>
            <h1 className="text-9xl">
                {account?.name}
            </h1>
        </main>
    )
}

export default Account