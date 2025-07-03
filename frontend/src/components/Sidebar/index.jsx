import "./Sidebar.css";
import NavItem from "../NavItem";
import { FaChartLine, FaUserTie, FaFileContract, FaBusinessTime, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";

const Sidebar = () => {

    const navigate = useNavigate();

    const navItems = [
        { label: "Dashboard", href: "/dashboard", icon: FaChartLine },
        { label: "Empregadores", href: "/empregadores", icon: FaUserTie },
        { label: "Contratos de Trabalho", href: "/contratos", icon: FaFileContract },
        { label: "Registros de Ponto", href: "/registros", icon: FaBusinessTime },
    ];

    const logoutItem = { label: "Logout", icon: FaSignOutAlt};
        
    const handleClickLogout = (event) => {
        event.preventDefault();
        
        Notification.info("Você foi desconectado! Redirecionando para a página inicial...")
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/");
        }, 2000);
    }
    
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
