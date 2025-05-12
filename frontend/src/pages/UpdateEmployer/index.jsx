import "../pagesStyle.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
import UserForm from "../../components/UserForm/index.jsx";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import Sidebar from "../../components/Sidebar";
import handleError from "../../services/errors.js";

const UpdateEmployer = () => {
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

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployer = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/employer/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployer(response.data);
            } catch (err) {
                Notification.error("Erro ao carregar dados do empregador.");
            }
        };
        fetchEmployer();
    }, [id]);

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
            await axios.put(`${import.meta.env.VITE_API_URL}/employer/${id}`, employer, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Notification.success("Empregador atualizado com sucesso!");
            setTimeout(() => navigate("/empregadores"), 1500);
        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
        }
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <UserForm user={employer} handleInputChange={handleInputUserChange} />
                    <AddressForm user={employer} handleInputChange={handleInputAddressChange} />
                    <ButtonForm>Atualizar Empregador</ButtonForm>
                </form>
            </section>
        </div>
    );
};

export default UpdateEmployer;