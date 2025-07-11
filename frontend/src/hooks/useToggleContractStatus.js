import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const useToggleContractStatus = () => {

    const toggleContractStatus = async (contractId, currentStatus, passwordAdmin) => {
        try {
            const token = localStorage.getItem("token");
            
            // Inverte o status atual
            const newStatus = !currentStatus;
            
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/contract/${contractId}`, 
                { 
                    status: newStatus,
                    passwordAdmin: passwordAdmin
                }, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            const statusText = newStatus ? "ativado" : "inativado";
            Notification.success(`Contrato ${statusText} com sucesso!`);
            
            return { success: true, newStatus };
        } catch (err) {
            console.error("Error toggling contract status:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
            return { success: false, newStatus: currentStatus };
        }
    };

    return toggleContractStatus;
}

export default useToggleContractStatus;
