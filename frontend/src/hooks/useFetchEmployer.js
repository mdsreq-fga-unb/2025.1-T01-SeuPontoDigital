import axios from "axios";
import Notification from "../components/Notification";

const useFetchEmployer = () => {

    const fetchEmployers = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data
        } catch (err) {
            Notification.error("Não foi possível carregar os dados dos empregadores!");
        }
    }

    const fetchOneEmployer = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employer/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data
        } catch (err) {
            Notification.error("Erro ao carregar os detalhes do empregador.");
        }
    }
    return { fetchEmployers, fetchOneEmployer };
}

export default useFetchEmployer;