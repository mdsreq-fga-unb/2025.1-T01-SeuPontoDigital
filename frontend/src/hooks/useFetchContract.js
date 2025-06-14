import axios from "axios";
import Notification from "../components/Notification";

const useFetchContract = () => {

    const fetchContract = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sign-contract`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            Notification.error("Não foi possível carregar os dados dos contratos!");
        }
    }
    const fetchOneContract = async (id) => {
        const token = localStorage.getItem("token");
        console.log("Fetching contract with ID:", id); // Debug log
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sign-contract/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Response data:", response.data); // Debug log
            return response.data
        } catch (err) {
            console.error("Error fetching contract:", err); // Debug log
            Notification.error("Erro ao carregar os detalhes do contrato.");
        }
    }
    return {fetchContract, fetchOneContract};
}

export default useFetchContract;