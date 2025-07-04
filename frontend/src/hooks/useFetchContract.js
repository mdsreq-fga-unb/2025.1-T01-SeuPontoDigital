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
    
    const fetchOneContract = async (contractID) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sign-contract/${contractID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data
        } catch (err) {
            Notification.error("Erro ao carregar os detalhes do contrato.");
        }
    }

    const fetchFullContractData = async (contractID) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/${contractID}/full`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data
        } catch (err) {
            console.error("Error fetching full contract data:", err);
            Notification.error("Erro ao carregar os dados completos do contrato.");
            return null;
        }
    }
    
    return {fetchContract, fetchOneContract, fetchFullContractData};
}

export default useFetchContract;