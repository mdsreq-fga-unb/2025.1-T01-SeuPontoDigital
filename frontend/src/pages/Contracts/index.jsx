import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import TableContracts from "../../components/TableContracts/TableContracts.jsx";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Notification from "../../components/Notification";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [contract, setContract] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate(); 

    const fieldsTH = ["Empregador", "Empregado", "Status", "Função", "Salário", "Data de início"];
    const fieldsTD = ["employer.name", "employee.name", "employer.active", "function", "salary", "date_start"];

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = (item) => {
        setContractToDelete(item);
        setModalOpen(true);
    };

    // ============================== FETCH CONTRACTS ==============================

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contracts/list`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE CONTRACT ==============================

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/contract/delete/${contractToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setModalOpen(false);
            setContractToDelete(null);
            Notification.success("Contrato excluído com sucesso!");
            fetchData();
        } catch (err) {
            console.error("error in handleConfirmDelete contract:", err);
            Notification.error("Erro ao excluir contrato. Tente novamente mais tarde!");
            setModalOpen(false);
            setContractToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setModalOpen(false);
        setContractToDelete(null);
    };
    
    // ============================== FILTER SEARCH ==============================

    const filteredData = data.filter((contract) => {
        return  contract.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contract.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contract.employer.name.toLowerCase().includes(searchTerm.toLowerCase())
    });

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd onClick={() => navigate("/empregados/adicionar")}>Adicionar Contrato</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <TableContracts fieldsTH={fieldsTH} fieldsTD={fieldsTD} data={filteredData} onDelete={handleDeleteRequest} />

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o contrato?`} />
            </div>
        </div>
    );
};

export default Contracts;
