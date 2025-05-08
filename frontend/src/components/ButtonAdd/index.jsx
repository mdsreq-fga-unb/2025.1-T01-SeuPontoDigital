import "./ButtonAdd.css";
import { FaSquarePlus } from "react-icons/fa6";

const ButtonAdd = ({ onClick, children }) => {
    return (
        <div className="container-button-add">
            <FaSquarePlus className="icon-add" />
            <button onClick={onClick}>{children}</button>
        </div>
    );
};

export default ButtonAdd;