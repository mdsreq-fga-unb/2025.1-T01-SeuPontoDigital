import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostCompleteContract = () => {

    const postCompleteContract = async (contractData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/contract/complete`, 
                contractData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            return response.data;
        } catch (err) {
            console.error("Error creating complete contract:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return null;
        }
    };

    return postCompleteContract;
};

export default usePostCompleteContract;
