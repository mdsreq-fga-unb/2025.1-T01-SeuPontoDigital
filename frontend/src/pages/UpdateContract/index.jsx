import "../pagesStyle.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import useFetchContract from "../../hooks/useFetchContract.js";
import usePutContract from "../../hooks/usePutContract.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import Notification from "../../components/Notification";

const UpdateContract = () => {
    const putContract = usePutContract();
    const {fetchOneContract} = useFetchContract();
    const {id} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [contract, setContract] = useState({
        id: "",
        employer_id: "",
        name: "",
        cpf: "",
        phone: "",
        job_function: "",
        work_schedule_type: "",
        break_type: "fixed",
        break_interval: "",
        break_start: "",
        break_end: "",
        work_days: "",
        salary: "",
        app_access: false,
        contract_status: "",
        start_date: "",
        end_date: "",
        workplace_employer: false,
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
            console.log("Contract ID:", id); // Debug log
            const contractData = await fetchOneContract(id);
            console.log("Contract Data:", contractData); // Debug log
            if (contractData) {
                // Função auxiliar para formatar CPF
                const formatCPF = (cpf) => {
                    if (!cpf) return "";
                    const cleaned = cpf.replace(/\D/g, '');
                    return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                };

                // Função auxiliar para formatar telefone
                const formatPhone = (phone) => {
                    if (!phone) return "";
                    const cleaned = phone.replace(/\D/g, '');
                    if (cleaned.length === 11) {
                        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
                    } else if (cleaned.length === 10) {
                        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
                    }
                    return phone;
                };

                // Mapear dados da nova estrutura retornada pelo getOneSignContract
                setContract({
                    id: contractData.contract?.id || "",
                    employer_id: contractData.employer?.id || "",
                    // Dados do funcionário
                    name: contractData.employee?.name || "",
                    cpf: formatCPF(contractData.employee?.cpf) || "",
                    phone: formatPhone(contractData.employee?.phone) || "",
                    // Dados do contrato
                    job_function: contractData.contract?.function || "",
                    salary: contractData.contract?.salary || "",
                    work_schedule_type: contractData.contract?.work_schedule_type || "",
                    break_type: contractData.contract?.break_type === "range" ? "range" : "fixed",
                    break_interval: contractData.contract?.break_interval || "",
                    break_start: contractData.contract?.break_start || "",
                    break_end: contractData.contract?.break_end || "",
                    work_days: contractData.contract?.work_days || "",
                    app_access: contractData.contract?.access_app || false,
                    contract_status: contractData.contract?.status || "",
                    start_date: contractData.contract?.start_date || "",
                    end_date: contractData.contract?.end_date || "",
                    // Dados do endereço de trabalho
                    workplace_employer: false, // Valor padrão já que não vem do novo modelo
                    workplace_cep: contractData.address?.cep || "",
                    workplace_street: contractData.address?.street || "",
                    workplace_home_number: contractData.address?.house_number || "",
                    workplace_city: contractData.address?.city || "",
                    workplace_state: contractData.address?.uf || "",
                    workplace_neighborhood: contractData.address?.neighborhood || "",
                    workplace_complement: contractData.address?.complement || "",
                });
            }
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
