import "../pagesStyle.css"
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchInput from "../../components/SearchInput";
import ConfirmModal from "../../components/ConfirmModal";
import StatusConfirmModal from "../../components/StatusConfirmModal";
import Table from "../../components/Table";
import filterDataContract from "../../services/filterDataContract";
import useFetchContract from "../../hooks/useFetchContract";
import useDeleteContract from "../../hooks/useDeleteContract";
import useToggleContractStatus from "../../hooks/useToggleContractStatus";
import { useNavigate } from "react-router-dom";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [contractToToggle, setContractToToggle] = useState(null);
    const filteredData = filterDataContract(data, searchTerm);
    const { fetchContract } = useFetchContract();
    const deleteContract = useDeleteContract();
    const toggleContractStatus = useToggleContractStatus();
    const navigate = useNavigate();

    const loadContracts = async () => {
        const contracts = await fetchContract();
        console.log("Raw contracts data:", contracts); // Debug log
        
        if (!contracts || !Array.isArray(contracts)) {
            console.log("No contracts data or invalid format");
            setData([]);
            return;
        }
        
        const mapped = contracts.map(item => ({
            id: item.contract?.id ?? "", 
            employerName: item.employer?.name ?? "",
            employeeName: item.employee?.name ?? "",
            function: item.contract?.function ?? "",
            status: item.contract?.status ? "Ativo" : "Inativo",
            statusValue: item.contract?.status ?? false, // Valor booleano para o toggle
            salary: item.contract?.salary ?? "-",
            start_date: item.contract?.start_date ?? "-",
            access_app: item.contract?.access_app ? "Ativo" : "Inativo"
        }));
        console.log("Mapped contracts data:", mapped); // Debug log
        const sorted = mapped.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        setData(sorted);
    };

    useEffect(() => {
        loadContracts();
    }, []);

    const fieldsTH = ["Empregador", "Empregado", "Função do Empregado", "Salário", "Data Admissão", "Status do Contrato", "Acesso ao aplicativo"];
    const fieldsTD = ["employerName", "employeeName", "function", "salary", "start_date", "status", "access_app"];

    const handleDeleteRequest = (item) => {
        setContractToDelete(item);
        setModalOpen(true);
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setContractToDelete(null);
    };

    const onSuccessDeleteContract = () => {
        setModalOpen(false);
        setContractToDelete(null);
        loadContracts();
    }

    const handleConfirmDelete = async (password) => {
        if (!contractToDelete) return;
        await deleteContract(contractToDelete.id, password, onSuccessDeleteContract);
    };

    const handleEditRequest = (id) => {
        navigate(`/contratos/editar/${id}`);
    }

    const handleToggleStatus = (contract) => {
        setContractToToggle(contract);
        setStatusModalOpen(true);
    };

    const handleCancelToggle = () => {
        setStatusModalOpen(false);
        setContractToToggle(null);
    };

    const handleConfirmToggle = async (password) => {
        if (!contractToToggle) return;
        
        const result = await toggleContractStatus(
            contractToToggle.id, 
            contractToToggle.statusValue, 
            password
        );
        
        if (result.success) {
            // Atualizar o estado local para refletir a mudança imediatamente
            setData(prevData => 
                prevData.map(item => 
                    item.id === contractToToggle.id 
                        ? { 
                            ...item, 
                            statusValue: result.newStatus, 
                            status: result.newStatus ? "Ativo" : "Inativo" 
                          }
                        : item
                )
            );
            setStatusModalOpen(false);
            setContractToToggle(null);
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <SearchInput
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <Table
                    fieldsHeader={fieldsTH}
                    fieldsData={fieldsTD}
                    data={filteredData}
                    onDelete={handleDeleteRequest}
                    onEdit={handleEditRequest}
                    onToggleStatus={handleToggleStatus}
                />
                <ConfirmModal
                    isOpen={modalOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    message="Confirme sua senha para excluir o contrato de"
                    nameEmployer={contractToDelete?.employeeName}
                />
                <StatusConfirmModal
                    isOpen={statusModalOpen}
                    onConfirm={handleConfirmToggle}
                    onCancel={handleCancelToggle}
                    contractName={contractToToggle?.employeeName}
                    currentStatus={contractToToggle?.statusValue}
                />
            </div>
        </div>
    );
};

export default Contracts;
