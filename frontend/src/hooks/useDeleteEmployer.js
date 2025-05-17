import axios from "axios";
import Notification from "../components/Notification";

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
        } 
        catch (err) {
            Notification.error("Erro ao excluir usuário. Verifique sua senha e tente novamente!");
        }
    }
    return deleteEmployer;
}

export default useDeleteEmployer;
