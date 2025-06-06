import "../pagesStyle.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import useFetchContract from "../../hooks/useFetchContract.js";
import usePutContract from "../../hooks/usePutContract.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";

const UpdateContract = () => {
    const putContract = usePutContract();
    const {fetchOneContract} = useFetchContract();
    const {id} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [contract, setContract] = useState({
        name: "",
        cpf: "",
        phone: "",
        email: "",
        job_function: "",
        work_schedule_type: "",
        break_type: "fixed", // NOVO
        break_interval: "",
        break_start: "",
        break_end: "",
        work_days: "",
        salary: "",
        app_access:"",
        workplace_employer: "",
        workplace_cep: "",
        workplace_street: "",
        workplace_home_number: "",
        workplace_city: "",
        workplace_state: "",
        workplace_neighborhood: "",
        workplace_complement: "",
    });

    useEffect(() => {
        const fetchContract = async () => {
            const contractData = await fetchOneContract(id);
            // Garante que break_type está correto (default para 'fixed' se não vier do backend)
            setContract({
                ...contractData,
                break_type: contractData.break_type === "range" ? "range" : "fixed"
            });
        };
        fetchContract();
    }, [id]);

    const validateBreak = (contract) => {
        if (contract.break_type === "fixed") {
            if (!contract.break_interval) return false;
            const [h, m] = contract.break_interval.split(":").map(Number);
            const total = h * 60 + m;
            return total >= 15 && total <= 120;
        } else {
            if (!contract.break_start || !contract.break_end) return false;
            const [h1, m1] = contract.break_start.split(":").map(Number);
            const [h2, m2] = contract.break_end.split(":").map(Number);
            const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
            return diff >= 15 && diff <= 120 && diff > 0;
        }
    };

    const handleInputUserChange = ({ name, value }) => {
        setContract((prev) => ({ ...prev, [name]: value }));
    };

    const closeModal = () => setModalOpen(false);

    const handleFormSubmit = async (passwordInput) => {
        if (!validateBreak(contract)) {
            Notification.error("Preencha corretamente o intervalo de descanso!");
            return;
        }
        putContract(contract, closeModal, passwordInput);
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} id={contract.employer_id}/>
                </form>
                <button onClick={() => setModalOpen(true)} className="button-add-employer-confirm">Atualizar Contrato</button>
            </section>
            <ConfirmModal
                    isOpen={modalOpen}
                    onConfirm={ async (passwordInput) => {
                        setPassword(passwordInput);
                        await handleFormSubmit(passwordInput);
                    }}
                    onCancel={() => setModalOpen(false)}
                    message="Confirme sua senha para atualizar os dados do contrato de"
                    nameEmployer={contract.name}
                />
        </div>
    );
};

export default UpdateContract;
