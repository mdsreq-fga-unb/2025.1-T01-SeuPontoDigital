import axios from "axios";
import Notification from "../components/Notification";
import handleError from "../services/errors";

const useDeleteEmployer = () => {

    const deleteEmployer = async (id, password, onSuccess) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/employer/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { password }, 
            });
            Notification.success("Usuário excluído com sucesso!");
            if (onSuccess) onSuccess();
        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return deleteEmployer;
}

export default useDeleteEmployer;
