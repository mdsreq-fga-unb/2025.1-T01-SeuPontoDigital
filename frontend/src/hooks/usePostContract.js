import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostContract = () => {

    const postContract = async (contract) => {
        try{
            const token = localStorage.getItem("token")
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/contract`, contract, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            
            return response.data.contractId;
        }
        catch(err){
            handleError(err.response?.data.message || err.response?.data.errors);
            return null;
        }
    }
    return postContract;
}

export default usePostContract;