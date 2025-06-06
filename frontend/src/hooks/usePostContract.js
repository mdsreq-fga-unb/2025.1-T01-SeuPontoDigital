import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import handleError from "../services/errors";

const usePostContract = () => {
    const navigate = useNavigate();

    const postContract = async (contract) => {
        try{
            const token = localStorage.getItem("token")
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/contract`, contract, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            Notification.success("Contrato cadastrado com sucesso!");
            setTimeout(() => navigate("/contratos"), 1500);
        }
        catch(err){
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return postContract;
}

export default usePostContract;