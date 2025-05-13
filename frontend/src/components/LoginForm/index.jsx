import "./LoginForm.css";
import TextInput from "../TextInput";
import ButtonForm from "../ButtonForm";
import useLogin from "../../hooks/useLogin.js";

const LoginForm = () => {

    const { email, password, setEmail, setPassword, handleLoginSubmit } = useLogin();

    return (
        <section className="section-login-form">
            <img src="./images/human.png" />
            <div className="container-login-form">
                <form onSubmit={handleLoginSubmit}>
                    <h2>SeuPonto<span>Digital</span></h2>

                    <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />

                    <TextInput  label="Senha"  type="password" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
   
                    <ButtonForm>Acessar</ButtonForm>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
