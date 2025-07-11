import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostEmploy = () => {

    const postEmploy = async (employerId, employeeId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employ`, 
                { 
                    employerID: employerId,
                    employeeID: employeeId
                }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error creating employ relationship:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return postEmploy;
};

export default usePostEmploy;
