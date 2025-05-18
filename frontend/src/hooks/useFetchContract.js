import axios from "axios";
import Notification from "../components/Notification";

const useFetchContract = () => {

    const fetchContract = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contracts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            Notification.error("Não foi possível carregar os dados dos contratos!");
        }
    }
    const fetchOneContract = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data
        } catch (err) {
            Notification.error("Erro ao carregar os detalhes do contrato.");
        }
    }
    return {fetchContract, fetchOneContract};
}

export default useFetchContract;