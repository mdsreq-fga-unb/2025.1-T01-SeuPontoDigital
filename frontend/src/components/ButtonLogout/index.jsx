import "./ButtonLogout.css"
import { useNavigate } from "react-router-dom"

const ButtonLogout = (props) => {
    const navigate = useNavigate();

    const handleClickLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="div-button-logout">
            <button onClick={handleClickLogout}>{props.children}</button>
        </div>
    )
}

export default ButtonLogout;