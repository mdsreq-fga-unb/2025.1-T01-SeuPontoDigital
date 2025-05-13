import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import axios from "axios";

const useLogin = () => {

    const url = `import.meta.env.VITE_API_URL/api/login`;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/empregadores");
    }, [navigate]);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try{    
            const response = await axios(url, {email, password});
            localStorage.setItem("token", response.data.token);
            Notification.success("Usuário autenticado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 2000);
        }
        catch(err){
            if (err?.response?.status === 401){
                Notification.error("Email ou senha incorretos!");
            }
            else{
                Notification.error("Erro interno no servidor. Tente novamente mais tarde!");
            }
        }
    }
    return {email, setEmail, password, setPassword, handleLoginSubmit};
}

export default useLogin;