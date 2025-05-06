/*
import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Notification from "../../components/Notification";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate(); 

    const fieldsTH = ["Empregador", "Empregado", "Telefone", "Profissão", "Email"];
    const fieldsTD = ["name", "cpf", "phone", "occupation", "email"];

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
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contracts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data.sort((a,b) => a.name.localeCompare(b.name)));
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE CONTRACT ==============================

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/contract/${contractToDelete.id}`, {
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

    const filteredData = data.filter((contract) =>
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd onClick={() => navigate("/contratos/adicionar")}>Adicionar Contrato</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} data={filteredData} onDelete={handleDeleteRequest} />

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o contrato ${contractToDelete?.name}?`} />
            </div>
        </div>
    );
};

export default Contracts;
*/