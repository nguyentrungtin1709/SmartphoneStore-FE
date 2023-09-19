import axios from "axios";
import { server } from "../utils/config.jsx";
import useToken from "./useToken.jsx";

export const useAuthAxios = () => {
    const token = useToken()
    return axios.create({
        baseURL: server,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}