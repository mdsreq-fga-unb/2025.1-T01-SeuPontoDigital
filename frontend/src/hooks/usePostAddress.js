import axios from "axios";
import handleError from "../services/errors";

const usePostAddress = () => {

    const postAddress = async (address) => {
        try{
            const token = localStorage.getItem("token")
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/address`, address, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            return response.data.id_address
        }
        catch(err){
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return postAddress;
}

export default usePostAddress;