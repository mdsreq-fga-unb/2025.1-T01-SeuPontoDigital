import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import handleError from "../services/errors";

const usePutEmployer = () => {
    const navigate = useNavigate();

    const putEmployer = async (employer, closeModal, passwordInput) => {
        const token = localStorage.getItem("token");
        const adminEmail = localStorage.getItem("adminEmail"); // Pega o email do admin do localStorage

        try {
            // O backend já faz a separação entre dados do employer e endereço
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/employer/${employer.id}`, 
                { 
                    ...employer, 
                    passwordAdmin: passwordInput,
                    adminEmail: adminEmail // Envia o email do admin
                }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (closeModal) closeModal();
            Notification.success("Empregador atualizado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 1000);

        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return putEmployer;
}

export default usePutEmployer;
