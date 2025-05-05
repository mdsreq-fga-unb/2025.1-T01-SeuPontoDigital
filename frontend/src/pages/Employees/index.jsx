import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import axios from "axios";
import Notification from "../../components/Notification";

const Employees = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    const fieldsTH = ["Nome", "CPF", "Telefone", "Profissão", "Email"];
    const fieldsTD = ["name", "cpf", "phone", "occupation", "email"];

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = (item) => {
        setEmployeeToDelete(item);
        setModalOpen(true);
    };

    // ============================== FETCH EMPLOYEES ==============================

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data.sort((a,b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE EMPLOYEE ==============================

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/employee/${employeeToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setModalOpen(false);
            setEmployeeToDelete(null);
            Notification.success("Usuário excluído com sucesso!");
            fetchData();
        } catch (err) {
            console.error("error in handleConfirmDelete employee:", err);
            Notification.error("Erro ao excluir usuário. Tente novamente mais tarde!");
            setModalOpen(false);
            setEmployeeToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setModalOpen(false);
        setEmployeeToDelete(null);
    };
    
    // ============================== FILTER SEARCH ==============================

    const filteredData = data.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd onClick={() => navigate("/empregado/adicionar")}>Adicionar Empregado</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} data={filteredData} onDelete={handleDeleteRequest} />

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o empregado ${employeeToDelete?.name}?`} />
            </div>
        </div>
    );
};

export default Employees;