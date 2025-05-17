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
    return fetchContract;
}

export default useFetchContract;