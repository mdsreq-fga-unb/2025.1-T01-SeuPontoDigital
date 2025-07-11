import axios from "axios";
import handleError from "../services/errors";

const usePostAddress = () => {

    const postAddress = async (address) => {
        try{
            console.log("Sending address data:", address);
            
            const token = localStorage.getItem("token")
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/address`, address, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            
            console.log("Address response:", response.data);
            return response.data.id_address;
        }
        catch(err){
            console.error("Error creating address:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return null;
        }
    }
    return postAddress;
}

export default usePostAddress;