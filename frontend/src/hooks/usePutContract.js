import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import handleError from "../services/errors";

const usePutContract = () => {
    const navigate = useNavigate();

    const putContract = async (contract, closeModal, passwordInput) => {
        const token = localStorage.getItem("token");

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/contract/${contract.id}`, { ...contract, password: passwordInput }, { headers: { Authorization: `Bearer ${token}` } }
            );

            if (closeModal) closeModal();
            Notification.success("Contrato atualizado com sucesso!");
            setTimeout(() => navigate("/contratos"), 1000);

        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return putContract;
}

export default usePutContract;
