import "./Sidebar.css";
import NavItem from "../NavItem";
import { FaChartLine, FaUsers, FaUserTie, FaFileContract, FaSignOutAlt } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navItems = [
        { label: "Dashboard", href: "/dashboard", icon: FaChartLine },
        { label: "Empregados", href: "/empregados", icon: FaUsers },
        { label: "Empregadores", href: "/empregadores", icon: FaUserTie },
        { label: "Contratos de Trabalho", href: "/contratos/trabalho", icon: FaFileContract },
        { label: "Contratos Ativos", href: "/contratos", icon: FaFileCircleCheck },
    ];

    const logoutItem = {
        label: "Logout",
        icon: FaSignOutAlt,
    };

    const handleClickLogout = (event) => {
        event.preventDefault();
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/");
        }, 1000);
    }

    const navigate = useNavigate();

    return (
        <nav className="sidebar-nav">
            <div className="sidebar-header">
                <img src="/images/seupontodigital.png" alt="Logo" />
                <p>SeuPontoDigital</p>
            </div>
            <ul className="nav-list">
                {navItems.map((item, index) => (
                    <NavItem key={index} label={item.label} href={item.href} icon={item.icon} />
                ))}
            </ul>
            <ul className="nav-list logout-list" id="logout-item">
                <NavItem label={logoutItem.label} icon={logoutItem.icon} onClick={handleClickLogout} />
            </ul>
        </nav>
    );
};

export default Sidebar;
