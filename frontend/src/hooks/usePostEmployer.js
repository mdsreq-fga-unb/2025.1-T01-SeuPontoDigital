import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import handleError from "../services/errors";

const usePostEmployer = () => {
    const navigate = useNavigate();

    const postEmployer = async (employer) => {
        try{
            console.log("Sending employer data:", employer);
            
            const token = localStorage.getItem("token")
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employer`, employer, {
                    headers: { Authorization: `Bearer ${token}`} } 
            );
            
            console.log("Employer response:", response.data);
            Notification.success("Empregador cadastrado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 1500);
        }
        catch(err){
            console.error("Error creating employer:", err);
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    }
    return postEmployer;
}

export default usePostEmployer;