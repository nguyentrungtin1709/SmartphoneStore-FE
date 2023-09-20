import {useAuthAxios} from "../hooks/useAuthAxios.jsx";
import {useEffect, useState} from "react";

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
        <div>
            <h1 className="text-9xl">
                {account?.name}
            </h1>
        </div>
    )
}

export default Account