import "../pagesStyle.css"
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchInput from "../../components/SearchInput";
import ConfirmModal from "../../components/ConfirmModal";
import Table from "../../components/Table";
import filterDataContract from "../../services/filterDataContract";
import useFetchContract from "../../hooks/useFetchContract";
import useFetchEmployer from "../../hooks/useFetchEmployer";
import useDeleteContract from "../../hooks/useDeleteContract";

const Contracts = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [contractToDelete, setContractToDelete] = useState(null);
    const filteredData = filterDataContract(data, searchTerm);
    const {fetchOneEmployer} = useFetchEmployer();
    const fetchContract = useFetchContract();
    const deleteContract = useDeleteContract();

    // Load data of contracts and name of each employer
    const loadContracts = async () => {
        const contracts = await fetchContract();
        if (contracts) {
            const contractsWithEmployer = await Promise.all(contracts.map(async (contract) => {
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

    const fieldsTH = ["Empregador", "Empregado","Função do Empregado", "Status","Salário", "Data de início", "Acesso ao aplicativo"];
    const fieldsTD = ["nameEmployer", "name", "job_function", "contract_status", "salary", "contract_start_date", "app_access"];

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
        if(!contractToDelete) return;
        await deleteContract(contractToDelete.id, password, onSuccessDeleteContract);
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
                <ConfirmModal 
                    isOpen={modalOpen} 
                    onConfirm={handleConfirmDelete} 
                    onCancel={handleCancelDelete} 
                    message="Confirme sua senha para excluir o contrato:"
                />
            </div>
        </div>
    );
};

export default Contracts;
