import "./ButtonAdd.css";
import { FaSquarePlus } from "react-icons/fa6";

const ButtonAdd = ({ onClick, children }) => {
    return (
        <div className="button-add-container">
            <FaSquarePlus className="add-icon" />
            <button onClick={onClick}>{children}</button> {/* Adicionado onClick aqui */}
        </div>
    );
};

export default ButtonAdd;