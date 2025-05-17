import "../pagesStyle.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
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
    const { fetchEmployers, fetchOneEmployer } = useFetchEmployer();
    const deleteEmployer = useDeleteEmployer();
    const filteredData = filterDataEmployer(data, searchTerm);
    const fieldsHeader = ["Nome", "CPF", "Telefone", "Email", "Bairro", "Rua"];
    const fieldsDataEmployer = ["name", "cpf", "phone", "email", "neighborhood", "street"];

    const loadEmployers = async () => {
        const employers = await fetchEmployers();
        if (employers) {
            const sorted = employers.sort((a, b) => a.name.localeCompare(b.name));
            setData(sorted);
        }
    }

    useEffect(() => {
        loadEmployers();
    }, []);

    const handleNameClick = async (employer) => {
        const dataEmployer = await fetchOneEmployer(employer.id)
        setSelectedEmployer(dataEmployer);
        setDetailsModalOpen(true);
    }

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
        setSelectedEmployer(null);
    };

    const handleDeleteRequest = (item) => {
        setEmployerToDelete(item);
        setModalOpen(true);
    };

    const onSuccessDeleteEmployer = () => {
        setModalOpen(false);
        setEmployerToDelete(null);
        loadEmployers();
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setEmployerToDelete(null);
    };

    const handleConfirmDelete = async (password) => {
        if (!employerToDelete) return;
        await deleteEmployer(employerToDelete.id, password, onSuccessDeleteEmployer);
    };

    const handleEditRequest = (id) => {
        navigate(`/empregadores/editar/${id}`);
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd onClick={() => navigate("/empregadores/adicionar")}>Adicionar Empregador</ButtonAdd>
                    <SearchInput 
                        type="search" 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                    />
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
                    message="Confirme sua senha para excluir"
                    nameEmployer={employerToDelete?.name}
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
