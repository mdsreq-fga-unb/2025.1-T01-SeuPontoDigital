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
import { useFormContext } from '../../components/ContractContext';

const AddEmployee = () => {
    const { formData, setFormData } = useFormContext();
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

    const handleFormSubmit = (e) => {
        console.log("agora esta função não envia para o banco de dados, a que envia está presente em AddContract")
        e.preventDefault();

        setFormData({...formData, name: employee.name, cpf: employee.cpf, email: employee.email, phone: employee.phone, nacionality: employee.nacionality, marital_status: employee.marital_status, occupation: employee.occupation, rg: employee.rg, cep: employee.cep, street: employee.street, home_number: employee.home_number, city: employee.city, state: employee.state, neighborhood: employee.neighborhood, complement: employee.complement,
  });

        navigate('/contratos/adicionar');
    }
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const token = localStorage.getItem("token");
    //         await axios.post(
    //             `${import.meta.env.VITE_API_URL}/employee`,
    //             employee,
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }
    //         );
    //         Notification.success("Empregado cadastrado com sucesso!");
    //         setTimeout(() => navigate("/empregados"), 1500);
    //     } catch (err) {
    //         handleError(err.response?.data.message || err.response?.data.errors);
    //     }
    // };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <UserForm user={employee} handleInputChange={handleInputUserChange} />
                    <WorkCardForm user={employee} handleInputChange={handleInputUserChange}> <p><b>OBS: </b>Preencher os campos acima apenas no uso de carteira de trabalho física</p></WorkCardForm>
                    <ButtonForm>Próxima página</ButtonForm>
                </form>
            </section>
        </div>
    );
};

export default AddEmployee;