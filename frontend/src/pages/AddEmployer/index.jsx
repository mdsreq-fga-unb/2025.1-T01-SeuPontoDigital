import "../pagesStyle.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
import UserForm from "../../components/UserForm";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";

const AddEmployer = () => {
    const [employer, setEmployer] = useState({
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
        setEmployer((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputAddressChange = (address) => {
        setEmployer((prev) => ({ ...prev, ...address }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${import.meta.env.VITE_API_URL}/employer`,
                employer,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Notification.success("Empregador cadastrado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 1500);
        } catch (err) {
            console.error("Error in handleFormSubmit on add employer:", err.response?.data || err.message);
            Notification.error("Erro ao cadastrar empregador. Tente novamente mais tarde!");
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <UserForm user={employer} handleInputChange={handleInputUserChange} />
                    <AddressForm user={employer} handleInputChange={handleInputAddressChange} />
                    <ButtonForm>Cadastrar Empregador</ButtonForm>
                </form>
            </section>
        </div>
    );
};

export default AddEmployer;