import "./LoginForm.css"
import Notification from "../Notification";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import ButtonForm from "../ButtonForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            navigate("/empregadores");
        }    
    },[navigate])

    const handleInputEmail = (event) => setEmail(event.target.value);
        
    const handleInputPassword = (event) => setPassword(event.target.value);
        
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {email, password});
            localStorage.setItem("token", response.data.token);
            Notification.success("Usuário autenticado com sucesso!");
            setTimeout(() => {
                navigate("/empregadores");
            }, 2500);
        }
        catch (err) {
            if (err.status === 401) 
                Notification.error("Email ou senha incorretos!");
            else {
                Notification.error("Erro interno no servidor. Tente novamente mais tarde!");
            }
        }
    }
    return (
        <section className="section-login-form">
            <img src="./images/human.png" />
            <div className="container-login-form">
                <form onSubmit={handleFormSubmit}>
                    <h2>SeuPonto<span>Digital</span></h2>

                    <TextInput label="Email" type="email" value={email} onChange={handleInputEmail} placeholder="Digite seu email" className="div-login-text-input"/>

                    <TextInput label="Senha" type="password" value={password} onChange={handleInputPassword} placeholder="Digite sua senha" className="div-login-text-input"/>

                    <ButtonForm>Acessar</ButtonForm>
                </form>
            </div>
        </section>
    )
}
export default LoginForm;