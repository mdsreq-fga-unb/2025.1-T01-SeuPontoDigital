import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostWorkBreak = () => {

    const postWorkBreak = async (workBreak, contractId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/workbreak/${contractId}`, 
                workBreak, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error creating work break:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return postWorkBreak;
};

export default usePostWorkBreak;
