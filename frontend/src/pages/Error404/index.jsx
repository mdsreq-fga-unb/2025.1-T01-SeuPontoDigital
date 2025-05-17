import "./Error404.css"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Error404 = () => {

    const navigate = useNavigate();

    return (
        <div className="error404-container">
            <Header/>
            <h1 className="title-error404">ERROR 404</h1>
            <h2>Não foi possível encontrar essa página!</h2>
            <button onClick={() => navigate("/")} className="go-home-button">Voltar para o início</button>
            <Footer/>
        </div>
    )
}
export default Error404;