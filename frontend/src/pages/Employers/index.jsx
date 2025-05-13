import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../../components/Notification";
import { useNavigate } from "react-router-dom";


const Employers = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [employerToDelete, setEmployerToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fieldsTH = ["Nome", "CPF", "Telefone", "Profissão", "Email"];
    const fieldsTD = ["name", "cpf", "phone", "job_function", "email"];

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = (item) => {
        setEmployerToDelete(item);
        setModalOpen(true);
    };
    const navigate = useNavigate();

    // ============================== FETCH EMPLOYERS ==============================

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/employers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            setData(response.data.sort((a,b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE EMPLOYER ==============================

    const handleConfirmDelete = async (password) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/employer/${employerToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { password }, 
            });
            setModalOpen(false);
            setEmployerToDelete(null);
            Notification.success("Usuário excluído com sucesso!");
            fetchData();
        } catch (err) {
            console.error("error in handleConfirmDelete employer:", err);
            Notification.error("Erro ao excluir usuário. Verifique sua senha e tente novamente!");
            setModalOpen(false);
            setEmployerToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setModalOpen(false);
        setEmployerToDelete(null);
    };

    const handleEditRequest = (id) => {
        navigate(`/empregador/editar/${id}`);
    };

    // ============================== FILTER SEARCH ==============================

    const filteredData = data.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.job_function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                <ButtonAdd onClick={() => navigate("/empregadores/adicionar")}>Adicionar Empregador</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} data={filteredData} onDelete={handleDeleteRequest} onEdit={handleEditRequest} onAddEmployee={() => navigate("/empregados/adicionar")}/>

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o empregador ${employerToDelete?.name}?`} />
            </div>
        </div>
    );
};

export default Employers;
