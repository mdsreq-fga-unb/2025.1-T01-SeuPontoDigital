import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import usePostContract from "../../hooks/usePostContract.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams } from "react-router-dom";

const AddContract = () => {
    const postContract = usePostContract();
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
        if (!validateBreak(contract)) {
            Notification.error("Preencha corretamente o intervalo de descanso!");
            return;
        }
        postContract(contract);
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
