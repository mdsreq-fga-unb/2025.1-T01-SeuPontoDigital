import "./ButtonAdd.css";
import { FaSquarePlus } from "react-icons/fa6";

const ButtonAdd = (props) => {
    return (
        <div className="container-button-add">
            <FaSquarePlus className="icon-add" />
            <button>{props.children}</button>
        </div>
    )
}

export default ButtonAdd;