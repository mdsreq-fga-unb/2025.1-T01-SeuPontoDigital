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
import EmployerDetailsModal from "../../components/EmployerDetailsModal";
import useFetchEmployer from "../../hooks/useFetchEmployer";
import filterDataEmployer from "../../services/filterDataEmployer";
import useDeleteEmployer from "../../hooks/useDeleteEmployer";

const Employers = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [employerToDelete, setEmployerToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const navigate = useNavigate();
    const fetchEmployer = useFetchEmployer();
    const deleteEmployer = useDeleteEmployer();
    const filteredData = filterDataEmployer(data, searchTerm);
    const fieldsHeader = ["Nome", "CPF", "Telefone", "Email", "Bairro", "Rua"];
    const fieldsDataEmployer = ["name", "cpf", "phone", "email", "neighborhood", "street"];

    const loadData = async () => {
        const employers = await fetchEmployer();
        if (employers) {
            const sorted = employers.sort((a, b) => a.name.localeCompare(b.name));
            setData(sorted);
        }
        else Notification.error("Não foi possível carregar os dados dos empregadores!")
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleNameClick = async (employer) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employer/${employer.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSelectedEmployer(response.data);
            setDetailsModalOpen(true);
        } catch (err) {
            console.error("Erro ao buscar detalhes do empregador:", err);
            Notification.error("Erro ao carregar os detalhes do empregador.");
        }
    };

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
        setSelectedEmployer(null);
    };

    const handleDeleteRequest = (item) => {
        setEmployerToDelete(item);
        setModalOpen(true);
    };

    const onSuccess = () => {
        setModalOpen(false);
        setEmployerToDelete(null);
        loadData();
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setEmployerToDelete(null);
    };

    const handleConfirmDelete = async (password) => {
        if (!employerToDelete) return;
        await deleteEmployer(employerToDelete.id, password, onSuccess);
    };

    const handleEditRequest = (id) => {
        navigate(`/empregador/editar/${id}`);
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd onClick={() => navigate("/empregadores/adicionar")}>Adicionar Empregador</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>

                <Table 
                    fieldsHeader={fieldsHeader} 
                    fieldsData={fieldsDataEmployer} 
                    data={filteredData} 
                    onDelete={handleDeleteRequest} 
                    onEdit={handleEditRequest} 
                    onAddEmployee={() => navigate("/empregados/adicionar")} 
                    onNameClick={handleNameClick} 
                />

                <ConfirmModal 
                    isOpen={modalOpen}
                    onConfirm={handleConfirmDelete} 
                    onCancel={handleCancelDelete} 
                    message={`Deseja realmente excluir o empregador ${employerToDelete?.name}?`} 
                />

                <EmployerDetailsModal
                    isOpen={detailsModalOpen}
                    onRequestClose={handleCloseDetailsModal}
                    employerData={selectedEmployer}
                />
            </div>
        </div>
    );
};

export default Employers;
