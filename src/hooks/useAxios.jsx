import axios from "axios";
import { server } from "../utils/config.jsx";

export const useAuthAxios = () => {
    return axios.create({
        baseURL: server
    })
}