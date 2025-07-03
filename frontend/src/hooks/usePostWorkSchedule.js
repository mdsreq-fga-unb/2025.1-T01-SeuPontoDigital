import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostWorkSchedule = () => {

    const postWorkSchedule = async (workSchedule, contractId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/workschedule/${contractId}`, 
                workSchedule, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error creating work schedule:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return postWorkSchedule;
};

export default usePostWorkSchedule;
