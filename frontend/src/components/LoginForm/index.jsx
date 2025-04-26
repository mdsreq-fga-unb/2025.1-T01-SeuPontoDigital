import "./LoginForm.css"
import TextInput from "../TextInput";
import Button from "../Button";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Notification from "../Notification";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        setLoading(true);

    try {
        const response = await fetch(import.meta.env.VITE_API_URL+"/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
            if (!response.ok) {
                if(response.status === 401 || response.status === 403){
                    Notification.error("Usuário ou senha incorretos!");
                    return;
                }
                throw new Error(response.statusText);
            }
            Notification.sucess("Login realizado com sucesso!");
            const data = await response.json();
            console.log("api response:", data);

        } catch (error) {
            Notification.error("Erro de conexão com o servidor. Tente novamente mais tarde!");
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
    }
    return(
        <section className="login-form">;
            <div className="login-form-container">;
                <form onSubmit={handleSubmit}>;

                    <h2>SeuPonto<span>Digital</span></h2>;

                    <TextInput label="Email" type="email" value={email} onChange={setEmail}/>;
                    <TextInput label="Senha" type="password" value={password} onChange={setPassword}/>;

                    <Button disabled={loading}>
                    {loading ? "Acessando..." : "Acessar"};
                    </Button>;
                    <ToastContainer />;
                </form>;
            </div>;
        </section>
    )
}

export default LoginForm;