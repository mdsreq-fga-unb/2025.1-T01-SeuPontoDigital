import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePutContract = () => {

    const putContract = async (contractId, contractData) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/contract/${contractId}`, 
                contractData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error updating contract:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };
    return putContract;
}

export default usePutContract;
