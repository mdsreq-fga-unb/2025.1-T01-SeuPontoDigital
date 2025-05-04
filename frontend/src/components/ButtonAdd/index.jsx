import "./ButtonAdd.css";
import { FaSquarePlus } from "react-icons/fa6";

const ButtonAdd = (props) => {
    return (
        <div className="button-add-container">
            <FaSquarePlus className="add-icon" />
            <button>{props.children}</button>
        </div>
    )
}

export default ButtonAdd;