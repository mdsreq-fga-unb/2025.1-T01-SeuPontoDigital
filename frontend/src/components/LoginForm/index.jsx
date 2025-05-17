import "./LoginForm.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import ButtonForm from "../ButtonForm";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {

    const navigate = useNavigate();

    const {login, loading} = useLogin();
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
        login(email, password);
    }
    return (
        <section className="section-login-form">
            <img src="./images/human.png" />
            <div className="container-login-form">
                <form onSubmit={handleFormSubmit}>
                    <h2>SeuPonto<span>Digital</span></h2>

                    <TextInput label="Email" type="email" value={email} onChange={handleInputEmail} placeholder="Digite seu email" className="div-login-text-input"/>

                    <TextInput label="Senha" type="password" value={password} onChange={handleInputPassword} placeholder="Digite sua senha" className="div-login-text-input"/>

                    <ButtonForm disabled={loading}>{loading ? "Entrando..." : "Entrar"}</ButtonForm>
                </form>
            </div>
        </section>
    )
}
export default LoginForm;