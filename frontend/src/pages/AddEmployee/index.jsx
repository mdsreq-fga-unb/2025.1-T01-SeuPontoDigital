import "../pagesStyle.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkCardForm from "../../components/WorkCardForm";
import UserForm from "../../components/UserForm/index.jsx";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import handleError from "../../services/errors.js";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        nacionality: "",
        marital_status: "",
        occupation: "",
        rg: "",
        cep: "",
        street: "",
        home_number: "",
        city: "",
        state: "",
        neighborhood: "",
        complement: "",
    });

    const navigate = useNavigate();

    const handleInputUserChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_API_URL}/employee`,
                employee,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Notification.success("Empregado cadastrado com sucesso!");
            setTimeout(() => navigate("/empregados"), 1500);
        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <UserForm user={employee} handleInputChange={handleInputUserChange} />
                    <WorkCardForm user={employee} handleInputChange={handleInputUserChange}> <p><b>OBS: </b>Preencher os campos acima apenas no uso de carteira de trabalho física</p></WorkCardForm>
                    <ButtonForm>Cadastrar Empregado (próxima pagina)</ButtonForm>
                </form>
            </section>
        </div>
    );
};

export default AddEmployee;