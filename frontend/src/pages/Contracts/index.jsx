import "../pagesStyle.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import Table from "../../components/Table";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [contract, setContract] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate(); 

    const fieldsTH = ["Empregador", "Empregado", "Status", "Função", "Salário", "Data de início"];
    const fieldsTD = ["employer.name", "name", "contract_status", "job_function", "salary", "contract_start_date"];

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
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contracts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE CONTRACT ==============================

    const handleConfirmDelete = async (password) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/contract/${contractToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { password },
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
        return  contract.job_function.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                <Table fieldsHeader={fieldsTH} fieldsData={fieldsTD} data={filteredData} onDelete={handleDeleteRequest}/>

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o contrato?`} />
            </div>
        </div>
    );
};

export default Contracts;
