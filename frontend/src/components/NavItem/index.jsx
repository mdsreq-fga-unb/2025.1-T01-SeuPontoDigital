import { Link, useLocation } from "react-router-dom";
import "./NavItem.css";

const NavItem = ({ label, href, icon: Icon, onClick }) => {

    const location = useLocation();
    const isActive = location.pathname === href || location.pathname.startsWith(href + "/");

    return (
        <li className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClick}>
            <Link to={href}>
                <Icon className="nav-icon" />
                <span>{label}</span>
            </Link>
        </li>
    );
};

export default NavItem;
