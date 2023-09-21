import axios from "axios";
import { server } from "../utils/config.jsx";

export const useAxios = () => {
    return axios.create({
        baseURL: server
    })
}