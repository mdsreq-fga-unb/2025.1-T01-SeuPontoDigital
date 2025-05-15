import "../pagesStyle.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractForm from "../../components/ContractForm";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import { useFormContext } from "../../components/ContractContext";
import ButtonAdd from "../../components/ButtonAdd";
import { Button } from "@mui/material";

const AddContract = () => {
    const { formData, setFormData } = useFormContext();
    const [contract, setContract] = useState({
        id_employer: "",
        id_employee: "",
        job_function: "",
        daily_hour: "",
        days_number: "",
        clock_in: "",
        clock_out: "",
        break_start: "",
        break_end: "",
        salary: "",
        date_start: "",     
    })

    const navigate = useNavigate();

    const handleInputContractChange = (event) => {
        const { name, value } = event.target;
        setContract((prev) => ({ ...prev, [name]: value }));
        
    }

    // esta função deve ser consertada para enviar para a nova tabela
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setFormData({ ...formData, id_employer: contract.id_employer, id_employee: contract.id_employee, daily_hour: contract.daily_hour, days_number: contract.days_number, clock_in: contract.clock_in, clock_out: contract.clock_out, break_start: contract.break_start, salary: contract.salary, date_start: contract.date_start, job_function: contract.job_function})

        navigate('/contratos')
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_API_URL}/contract/adicionar`, formData, {headers: { 
                Authorization: `Bearer ${token}` }, 
            }
        );
            Notification.success("Contrato cadastrado com sucesso!");
            setTimeout(() => navigate("/contratos"), 1500); 
        } catch (err) {
            console.error("error in handleFormSubmit on add contract:", err.response?.data || err.message);
            Notification.error("Erro ao cadastrar contrato. Tente novamente mais tarde!");
        }
    }

    const handleEmpregadorSelect = (id) => {
        setContract((prevState) => ({
            ...prevState, // Mantém o estado anterior
            id_employer: id, // Atualiza somente o id_employee
        }));
    };

    const handleEmpregadoSelect = (id) => {
        setContract((prevState) => ({
            ...prevState, // Mantém o estado anterior
            id_employee: id, 
        }));
    };

    const handleCheckbox = (checked) => {
        setContract((prevState) => ({
            ...prevState, 
            active: checked, 
        }));
    };


    
    return (
        <div className="container-dashboard">
        <Sidebar />
        <section className="form-user-add">
            
            <form onSubmit={handleFormSubmit} className="form-users">

                <ContractForm user={contract} handleInputChange={handleInputContractChange} 
                setEmpregadorIdContractForm={handleEmpregadorSelect}
                setEmpregadoIdContractForm={handleEmpregadoSelect}
                addContractCheckBox={handleCheckbox}
                />
                
                <ButtonForm>Cadastrar Contrato</ButtonForm>
            </form>
               <ButtonAdd  onClick={() => navigate("/empregados/adicionar")}>{"≪"} Voltar à Cadastrar Empregado</ButtonAdd> 
               {/* <div className="container-button-add" >
                    <button onClick={() => navigate("/empregados/adicionar")}>{"≪"} Voltar à Cadastrar Empregado</button> 
               </div> */}
        </section>
        </div>
    )
}

export default AddContract;