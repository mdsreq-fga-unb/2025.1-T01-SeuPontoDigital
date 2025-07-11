import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostEmployee = () => {

    const postEmployee = async (employee) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employee`, 
                employee, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data.employeeId;
        } catch (err) {
            console.error("Error creating employee:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return null;
        }
    };

    return postEmployee;
};

export default usePostEmployee;
