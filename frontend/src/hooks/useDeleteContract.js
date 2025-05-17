import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const useDeleteContract = () => {

    const deleteContract = async (id, password, closeModal) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/contract/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { password },
            });
            Notification.success("Contrato excluído com sucesso!");
            if(closeModal) closeModal();
        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return deleteContract;
}

export default useDeleteContract;
