import "../pagesStyle.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import useFetchContract from "../../hooks/useFetchContract.js";
import usePutContract from "../../hooks/usePutContract.js";
import usePutEmployee from "../../hooks/usePutEmployee.js";
import usePutWorkSchedule from "../../hooks/usePutWorkSchedule.js";
import usePutWorkBreak from "../../hooks/usePutWorkBreak.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import Notification from "../../components/Notification";
import formatField from "../../services/formatField.js";

const UpdateContract = () => {
    const putContract = usePutContract();
    const putEmployee = usePutEmployee();
    const putWorkSchedule = usePutWorkSchedule();
    const putWorkBreak = usePutWorkBreak();
    const { fetchFullContractData } = useFetchContract();
    const navigate = useNavigate();
    const {id} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
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
        const loadContractData = async () => {
            console.log("Contract ID:", id); // Debug log
            const fullContractData = await fetchFullContractData(id);
            console.log("Full Contract Data:", fullContractData); // Debug log
            
            if (fullContractData) {
                // Função auxiliar para formatar CPF
                const formatCPF = (cpf) => {
                    if (!cpf) return "";
                    const cleaned = cpf.replace(/\D/g, '');
                    return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                };

                // Mapear dados do work break
                let breakType = "fixed";
                let breakInterval = "";
                let breakStart = "";
                let breakEnd = "";

                if (fullContractData.workBreak) {
                    if (fullContractData.workBreak.type === 'flex') {
                        breakType = "fixed"; // No frontend, flex break é chamado de "fixed" (duração fixa)
                        const hours = Math.floor(fullContractData.workBreak.duration_minutes / 60);
                        const minutes = fullContractData.workBreak.duration_minutes % 60;
                        breakInterval = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                        // Garantir que campos de horário fiquem vazios
                        breakStart = "";
                        breakEnd = "";
                    } else {
                        breakType = "range"; // Fixed break no backend é "range" no frontend
                        breakStart = fullContractData.workBreak.break_start || "";
                        breakEnd = fullContractData.workBreak.break_end || "";
                        // Garantir que campo de duração fica vazio
                        breakInterval = "";
                    }
                }

                // Mapear dados da jornada de trabalho
                const workDays = [];
                if (fullContractData.workSchedule) {
                    const dayMapping = {
                        'monday': 'segunda',
                        'tuesday': 'terca',
                        'wednesday': 'quarta',
                        'thursday': 'quinta',
                        'friday': 'sexta',
                        'saturday': 'sabado',
                        'sunday': 'domingo'
                    };

                    Object.keys(dayMapping).forEach(englishDay => {
                        const portugueseDay = dayMapping[englishDay];
                        const startKey = `${englishDay}_start`;
                        const endKey = `${englishDay}_end`;
                        
                        if (fullContractData.workSchedule[startKey] && fullContractData.workSchedule[endKey]) {
                            workDays.push({
                                day: portugueseDay,
                                start: fullContractData.workSchedule[startKey],
                                end: fullContractData.workSchedule[endKey]
                            });
                        }
                    });
                }

                setContract({
                    id: fullContractData.contract?.id || "",
                    employer_id: fullContractData.signContract?.id_employer || "",
                    // Dados do funcionário
                    name: fullContractData.employee?.name || "",
                    cpf: formatCPF(fullContractData.employee?.cpf) || "",
                    phone: formatField("removeDDI", fullContractData.employee?.phone) || "",
                    // Dados do contrato
                    job_function: fullContractData.contract?.function || "",
                    salary: fullContractData.contract?.salary || "",
                    work_schedule_type: fullContractData.workSchedule?.type || "",
                    break_type: breakType,
                    break_interval: breakInterval,
                    break_start: breakStart,
                    break_end: breakEnd,
                    work_days: workDays,
                    app_access: fullContractData.contract?.access_app || false,
                    contract_status: fullContractData.contract?.status || "",
                    start_date: fullContractData.contract?.start_date || "",
                    end_date: fullContractData.contract?.end_date || "",
                    // Dados do endereço de trabalho
                    workplace_employer: false, // Será determinado pela lógica
                    workplace_cep: fullContractData.address?.cep || "",
                    workplace_street: fullContractData.address?.street || "",
                    workplace_home_number: fullContractData.address?.house_number || "",
                    workplace_city: fullContractData.address?.city || "",
                    workplace_state: fullContractData.address?.uf || "",
                    workplace_neighborhood: fullContractData.address?.neighborhood || "",
                    workplace_complement: fullContractData.address?.complement || "",
                });
                
                // Armazenar o ID do funcionário para usar na atualização
                setEmployeeId(fullContractData.employee?.id || "");
                setDataLoaded(true);
            }
        };
        
        if (id && !dataLoaded) {
            loadContractData();
        }
    }, [id]); // Remover dataLoaded da dependência

    // Funções auxiliares para extrair dados (reutilizadas da criação)
    const extractWorkScheduleData = (contract) => {
        const workSchedule = {
            type: contract.work_schedule_type
        };

        // Adiciona os horários dos dias da semana baseado no work_days
        if (contract.work_days && Array.isArray(contract.work_days)) {
            contract.work_days.forEach(dayInfo => {
                if (dayInfo.day && dayInfo.start && dayInfo.end) {
                    const dayMapping = {
                        'segunda': 'monday',
                        'terca': 'tuesday', 
                        'quarta': 'wednesday',
                        'quinta': 'thursday',
                        'sexta': 'friday',
                        'sabado': 'saturday',
                        'domingo': 'sunday'
                    };
                    
                    const englishDay = dayMapping[dayInfo.day];
                    if (englishDay) {
                        workSchedule[`${englishDay}_start`] = dayInfo.start;
                        workSchedule[`${englishDay}_end`] = dayInfo.end;
                    }
                }
            });
        }

        return workSchedule;
    };

    const extractWorkBreakData = (contract) => {
        if (contract.break_type === "fixed") {
            const [hours, minutes] = contract.break_interval.split(':');
            return {
                type: 'flex',
                duration_minutes: parseInt(hours) * 60 + parseInt(minutes),
                // Garantir que campos de horário sejam explicitamente nulos
                break_start: null,
                break_end: null
            };
        } else {
            return {
                type: 'fixed',
                break_start: contract.break_start,
                break_end: contract.break_end,
                // Garantir que campo de duração seja explicitamente nulo
                duration_minutes: null
            };
        }
    };

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

        try {
            // 1. Atualizar dados do funcionário
            const employeeData = {
                name: contract.name,
                cpf: contract.cpf.replace(/\D/g, ''), // Remove formatação
                phone: contract.phone,
                passwordAdmin: passwordInput
            };

            const employeeSuccess = await putEmployee(employeeId, employeeData);
            if (!employeeSuccess) {
                Notification.error("Erro ao atualizar funcionário!");
                return;
            }

            // 2. Atualizar dados do contrato
            const contractData = {
                function: contract.job_function,
                salary: parseFloat(contract.salary),
                access_app: contract.app_access === "true" || contract.app_access === true,
                status: contract.contract_status === "true" || contract.contract_status === true,
                passwordAdmin: passwordInput
            };

            const contractSuccess = await putContract(contract.id, contractData);
            if (!contractSuccess) {
                Notification.error("Erro ao atualizar contrato!");
                return;
            }

            // 3. Atualizar jornada de trabalho
            const workScheduleData = extractWorkScheduleData(contract);
            const workScheduleSuccess = await putWorkSchedule(workScheduleData, contract.id);

            if (!workScheduleSuccess) {
                Notification.error("Erro ao atualizar jornada de trabalho!");
                return;
            }

            // 4. Atualizar dados de pausa
            const workBreakData = extractWorkBreakData(contract);
            const workBreakSuccess = await putWorkBreak(workBreakData, contract.id);

            if (!workBreakSuccess) {
                Notification.error("Erro ao atualizar dados de pausa!");
                return;
            }

            // 5. Se tudo deu certo, exibe sucesso e navega
            Notification.success("Contrato atualizado com sucesso!");
            closeModal();
            setTimeout(() => navigate("/contratos"), 1500);

        } catch (error) {
            console.error("Erro durante o processo de atualização do contrato:", error);
            Notification.error("Erro inesperado ao atualizar contrato!");
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} id={contract.employer_id} isEditing={true}/>
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
