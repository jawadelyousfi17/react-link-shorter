import axios from "axios";

const getData = async (url, token) => {
    try {
        const res = axios.get(url)
        return res.data
    } catch (error) {
        
    }
}