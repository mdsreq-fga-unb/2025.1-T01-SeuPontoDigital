import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePutWorkSchedule = () => {

    const putWorkSchedule = async (workScheduleData, contractId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/workschedule/${contractId}`, 
                workScheduleData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error updating work schedule:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return putWorkSchedule;
};

export default usePutWorkSchedule;
