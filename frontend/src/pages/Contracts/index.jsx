import "../pagesStyle.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import SearchInput from "../../components/SearchInput";
import ConfirmModal from "../../components/ConfirmModal";
import Table from "../../components/Table";
import filterDataContract from "../../services/filterDataContract";
import useFetchContract from "../../hooks/useFetchContract";
import useFetchEmployer from "../../hooks/useFetchEmployer";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const filteredData = filterDataContract(data, searchTerm);
    const {fetchOneEmployer} = useFetchEmployer();
    const fetchContract = useFetchContract();

    const loadContracts = async () => {
        const contracts = await fetchContract();
        if (contracts) {
            const contractsWithEmployer = await Promise.all(
                contracts.map(async (contract) => {
                    let nameEmployer = "";
                    if (contract.employer && contract.employer.id) {
                        const employer = await fetchOneEmployer(contract.employer.id);
                        nameEmployer = employer?.name || "";
                    }
                    return { ...contract, nameEmployer };
                })
            );
            const sorted = contractsWithEmployer.sort((a, b) => a.name.localeCompare(b.name));
            setData(sorted);
        }
    }; 

    useEffect(() => {
        loadContracts();
    }, []);

    const fieldsTH = ["Empregador", "Empregado", "Status", "Função", "Salário", "Data de início", "Acesso ao aplicativo"];
    const fieldsTD = ["nameEmployer", "name", "contract_status", "job_function", "salary", "contract_start_date", "app_access_status"];

    const handleDeleteRequest = (item) => {
        setContractToDelete(item);
        setModalOpen(true);
    };

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
                />

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o contrato?`} />
            </div>
        </div>
    );
};

export default Contracts;
