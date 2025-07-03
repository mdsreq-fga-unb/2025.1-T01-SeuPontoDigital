import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const usePostSignContract = () => {

    const postSignContract = async (employerId, employeeId, contractId, addressId) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Sign contract payload:", { 
                employerID: employerId,
                employeeID: employeeId,
                contractID: contractId,
                addressID: addressId
            });
            
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/sign-contract`, 
                { 
                    employerID: employerId,
                    employeeID: employeeId,
                    contractID: contractId,
                    addressID: addressId
                }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return true;
        } catch (err) {
            console.error("Error creating sign contract:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return false;
        }
    };

    return postSignContract;
};

export default usePostSignContract;
