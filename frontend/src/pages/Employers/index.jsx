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

const Employers = () => {
    const fetchEmployer = useFetchEmployer();
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [employerToDelete, setEmployerToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [detailsModalOpen, setDetailsModalOpen] = useState(false); 
    const [selectedEmployer, setSelectedEmployer] = useState(null); 

    const fieldsHeader = ["Nome", "CPF", "Telefone", "Email", "Bairro","Rua"];
    const fieldsDataEmployer = ["name", "cpf", "phone", "email", "neighborhood","street"];

    useEffect(() => {
        const loadData = async () => {
            const employers = await fetchEmployer();
            if (employers){
                const sorted = employers.sort((a,b) => a.name.localeCompare(b.name));
                setData(sorted);
            }
            else{
                Notification.error("Não foi possível carregar os dados dos empregadores!")
            }
        }
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
    const navigate = useNavigate();

    
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
            fetchEmployer();
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

    const filteredData = data.filter((employer) =>
        employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.job_function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar/>

            <div className="container-table-pages">
                <div className="container-search-button">
                <ButtonAdd onClick={() => navigate("/empregadores/adicionar")}>Adicionar Empregador</ButtonAdd>
                    <SearchInput type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <Table fieldsHeader={fieldsHeader} fieldsData={fieldsDataEmployer} data={filteredData} onDelete={handleDeleteRequest} onEdit={handleEditRequest} onAddEmployee={() => navigate("/empregados/adicionar")} onNameClick={handleNameClick}/>

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o empregador ${employerToDelete?.name}?`} />

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
