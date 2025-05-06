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
        function: "",
        daily_hour: "",
        days_number: "",
        clock_in: "",
        clock_out: "",
        break_time: "",
        salary: "",
        date_start: "",
        active: "",        
    })

    const navigate = useNavigate();

    const handleInputUserChange = (event) => {
        const { name, value } = event.target;
        setC((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputAddressChange = (address) => {
        setContract((prev) => ({ ...prev, ...address }));
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_API_URL}/contract`, contract, {headers: { 
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

    
    return (
        <div className="container-dashboard">
        <Sidebar />
        <section className="form-user-add">
            
            <form onSubmit={handleFormSubmit} className="form-users">

                <ContractForm user={contract} handleInputChange={handleInputUserChange}/>

                <ButtonForm>Cadastrar Contrato</ButtonForm>
            </form>
        </section>
        </div>
    )
}

export default AddContract;