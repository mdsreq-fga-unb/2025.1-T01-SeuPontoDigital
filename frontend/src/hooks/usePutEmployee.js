import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePutEmployee = () => {

    const putEmployee = async (employeeId, employeeData) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/employee/${employeeId}`, 
                employeeData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error updating employee:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return putEmployee;
};

export default usePutEmployee;
