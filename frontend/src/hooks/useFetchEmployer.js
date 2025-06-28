import axios from "axios";
import Notification from "../components/Notification";
import { useCallback } from "react";

const useFetchEmployer = () => {

    const fetchEmployers = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data
        } catch (err) {
            Notification.error("Não foi possível carregar os dados dos empregadores!");
        }
    }, []);

    const fetchOneEmployer = useCallback(async (id, includeContracts = false) => {
        const token = localStorage.getItem("token");
        try {
            const url = includeContracts 
                ? `${import.meta.env.VITE_API_URL}/api/employer/${id}?includeContracts=true`
                : `${import.meta.env.VITE_API_URL}/api/employer/${id}`;
                
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data
        } catch (err) {
            Notification.error("Erro ao carregar os detalhes do empregador.");
        }
    }, []);
    
    return { fetchEmployers, fetchOneEmployer };
}

export default useFetchEmployer;