import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import handleError from "../services/errors";

const usePostEmployer = () => {
    const navigate = useNavigate();

    const postEmployer = async (employer) => {
        try{
            const token = localStorage.getItem("token")
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employer`, employer, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            Notification.success("Empregador cadastrado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 1500);
        }
        catch(err){
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return postEmployer;
}

export default usePostEmployer;