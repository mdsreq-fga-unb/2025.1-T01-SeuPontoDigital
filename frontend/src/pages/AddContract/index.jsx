import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import usePostCompleteContract from "../../hooks/usePostCompleteContract.js";
import useFetchEmployer from "../../hooks/useFetchEmployer.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";

const AddContract = () => {
    const postCompleteContract = usePostCompleteContract();
    const { fetchOneEmployer } = useFetchEmployer();
    const navigate = useNavigate();
    const {id} = useParams();
    const [contract, setContract] = useState({
        employer_id: id,
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

    const handleInputUserChange = ({ name, value }) => {
        setContract((prev) => ({ ...prev, [name]: value }));
    };

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
                duration_minutes: parseInt(hours) * 60 + parseInt(minutes)
            };
        } else {
            return {
                type: 'fixed',
                break_start: contract.break_start,
                break_end: contract.break_end
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        // Validação básica dos campos obrigatórios
        if (!contract.name || !contract.cpf || !contract.job_function || !contract.salary) {
            Notification.error("Preencha todos os campos obrigatórios!");
            return;
        }
        
        if (!validateBreak(contract)) {
            Notification.error("Preencha corretamente o intervalo de descanso!");
            return;
        }

        try {
            // Preparar dados do funcionário
            const employeeData = {
                name: contract.name,
                cpf: contract.cpf.replace(/\D/g, ''), // Remove formatação
                phone: contract.phone
            };

            // Preparar dados do contrato
            const contractData = {
                function: contract.job_function,
                salary: parseFloat(contract.salary),
                start_date: new Date().toISOString().split('T')[0], // Data atual
                end_date: null,
                access_app: contract.app_access === "true" || contract.app_access === true,
                status: true // Sempre ativo ao criar
            };

            // Preparar dados do endereço
            const addressData = {
                cep: contract.workplace_cep,
                street: contract.workplace_street,
                house_number: contract.workplace_home_number,
                city: contract.workplace_city,
                uf: contract.workplace_state,
                neighborhood: contract.workplace_neighborhood,
                complement: contract.workplace_complement || null
            };

            // Preparar dados da jornada de trabalho
            const workScheduleData = extractWorkScheduleData(contract);

            // Preparar dados do intervalo
            const workBreakData = extractWorkBreakData(contract);

            // Preparar payload completo
            const completeContractData = {
                employee: employeeData,
                contract: contractData,
                address: addressData,
                workSchedule: workScheduleData,
                workBreak: workBreakData,
                employerId: id
            };

            console.log("Complete contract data being sent:", completeContractData);

            // Enviar tudo de uma vez para o endpoint unificado
            const result = await postCompleteContract(completeContractData);
            
            if (result) {
                Notification.success("Contrato cadastrado com sucesso!");
                setTimeout(() => navigate("/contratos"), 1500);
            } else {
                Notification.error("Erro ao criar contrato!");
            }

        } catch (error) {
            console.error("Erro durante o processo de criação do contrato:", error);
            Notification.error("Erro inesperado ao criar contrato!");
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} />
                </form>
                <button onClick={handleFormSubmit} className="button-add-employer-confirm">Cadastrar Contrato</button>
            </section>
        </div>
    );
};

export default AddContract;
