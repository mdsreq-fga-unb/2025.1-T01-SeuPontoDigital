import "../pagesStyle.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
import UserForm from "../../components/EmployerForm/index.jsx";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import handleError from "../../services/errors.js";

const UpdateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        nationality: "",
        marital_status: "",
        job_function: "",
        rg: "",
        cep: "",
        street: "",
        home_number: "",
        city: "",
        state: "",
        neighborhood: "",
        complement: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployee(response.data);
            } catch (err) {
                Notification.error("Erro ao carregar dados do empregado.");
            }
        };
        fetchEmployee();
    }, [id]);

    const handleInputUserChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputAddressChange = (address) => {
        setEmployee((prev) => ({ ...prev, ...address }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`${import.meta.env.VITE_API_URL}/employee/${id}`, employee, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Notification.success("Empregado atualizado com sucesso!");
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
                    <AddressForm user={employee} handleInputChange={handleInputAddressChange} />
                    <ButtonForm>Atualizar Empregado</ButtonForm>
                </form>
            </section>
        </div>
    );
};

export default UpdateEmployee;