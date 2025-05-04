import "./LoginForm.css"
import Notification from "../Notification";
import { useState } from "react";
import TextInput from "../TextInput";
import ButtonLogin from "../ButtonLogin";
import loginAdmin from "../../api/loginAdmin.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginAdmin(email, password);
            localStorage.setItem("token", data.token);
            Notification.success("Usuário autenticado com sucesso!")
            setTimeout(() => {
                navigate("/empregados");
            }, 2500);
        }
        catch (err) {
            if (err.status === 401)
                Notification.error("Email ou senha incorretos!")
            else {
                console.error("login failed:", err.response?.data || err.message)
                Notification.error("Erro interno no servidor. Tente novamente mais tarde!")
            }
        }
    }
    return (
        <section className="login-form">
            <img src="../../public/images/human.png" />
            <div className="login-form-container">
                <form onSubmit={handleFormSubmit}>

                    <h2>SeuPonto<span>Digital</span></h2>

                    <TextInput label="Email" type="email" value={email} onChange={setEmail} />

                    <TextInput label="Senha" type="password" value={password} onChange={setPassword} />

                    <ButtonLogin>Acessar</ButtonLogin>

                </form>
            </div>
        </section>
    )
}
export default LoginForm;