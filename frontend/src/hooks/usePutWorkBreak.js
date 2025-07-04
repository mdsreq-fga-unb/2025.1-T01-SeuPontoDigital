import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePutWorkBreak = () => {

    const putWorkBreak = async (workBreakData, contractId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/workbreak/${contractId}`, 
                workBreakData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error updating work break:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return putWorkBreak;
};

export default usePutWorkBreak;
