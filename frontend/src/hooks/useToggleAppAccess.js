import axios from "axios";
import handleError from "../services/errors";
import Notification from "../components/Notification";

const useToggleAppAccess = () => {
    const toggleAppAccess = async (contractId, currentAccessValue, password) => {
        try {
            const token = localStorage.getItem("token");

            const newAppAccess = !currentAccessValue;

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/contract/${contractId}`, 
                { 
                    access_app: !currentAccessValue,
                    passwordAdmin: password 
                }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const accessAppText = newAppAccess ? "ativado" : "inativado";
            Notification.success(`Acesso ao APP ${accessAppText} com sucesso!`);

            return {
                success: true,
                newAccessValue: !currentAccessValue
            };
        } catch (err) {
            console.error("Error toggling app access:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return {
                success: false,
                newAccessValue: currentAccessValue
            };
        }
    };
    
    return toggleAppAccess;
};

export default useToggleAppAccess;
