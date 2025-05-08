import "../pagesStyle.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractForm from "../../components/ContractForm";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";

const AddContract = () => {
    const [contract, setContract] = useState({
        id_employer: "",
        id_employee: "",
        function: "",
        daily_hour: "",
        days_number: "",
        clock_in: "",
        clock_out: "",
        break_start: "",
        break_end: "",
        salary: "",
        date_start: "",
        active: "",        
    })

    const navigate = useNavigate();


    const handleInputContractChange = (event) => {
        const { name, value } = event.target;
        setContract((prev) => ({ ...prev, [name]: value }));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_API_URL}/contract/adicionar`, contract, {headers: { 
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
        console.log("pai do pai recebeu", id)
        setContract((prevState) => ({
            ...prevState, // Mantém o estado anterior
            id_employer: id, // Atualiza somente o id_employee
        }));
    };

    const handleEmpregadoSelect = (id) => {
        console.log("pai do pai recebeu", id)
        setContract((prevState) => ({
            ...prevState, // Mantém o estado anterior
            id_employee: id, // Atualiza somente o id_employee
        }));
    };

    const handleCheckbox = (checked) => {
        // console.log("valor ao chegar aqui:", checked)
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
        </section>
        </div>
    )
}

export default AddContract;