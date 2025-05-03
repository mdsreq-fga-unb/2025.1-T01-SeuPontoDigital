import { Link } from "react-router-dom";
import "./NavItem.css";

const NavItem = ({ label, href, icon: Icon, onClick }) => {

    return (
        <li className="nav-item" onClick={onClick}>
            <Link to={href}>
                <Icon className="nav-icon" />
                <span>{label}</span>
            </Link>
        </li>
    );
};

export default NavItem;
