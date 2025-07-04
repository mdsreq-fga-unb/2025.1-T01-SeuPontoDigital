import axios from "axios";
import Notification from "../components/Notification";

const useFetchFullContract = () => {

    const fetchFullContract = async (contractId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/contract/${contractId}/full`, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            console.error("Error fetching full contract data:", err);
            Notification.error("Erro ao carregar os detalhes do contrato.");
            return null;
        }
    };

    return { fetchFullContract };
};

export default useFetchFullContract;
