import { useState } from "react";
import AddressForm from "../../components/AddressForm";
import TextInput from "../../components/TextInput";
import ButtonForm from "../../components/ButtonForm";
import Notification from "../../components/Notification";
import axios from "axios";
import "./AddEmployee.css";

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

    const handleInputChange = (event) => {
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
            Notification.success("Funcionário cadastrado com sucesso!");
        } catch (err) {
            console.error("Erro ao cadastrar funcionário:", err.response?.data || err.message);
            Notification.error("Erro ao cadastrar funcionário. Tente novamente.");
        }
    };

    return (
        <section className="add-employee-form">
            <form onSubmit={handleFormSubmit}>
                <h2>Adicionar Funcionário</h2>

                <TextInput
                    label="Nome"
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="CPF"
                    type="text"
                    name="cpf"
                    value={employee.cpf}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Telefone"
                    type="text"
                    name="phone"
                    value={employee.phone}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Nacionalidade"
                    type="text"
                    name="nacionality"
                    value={employee.nacionality}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Estado Civil"
                    type="text"
                    name="marital_status"
                    value={employee.marital_status}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="Profissão"
                    type="text"
                    name="occupation"
                    value={employee.occupation}
                    onChange={handleInputChange}
                />
                <TextInput
                    label="RG"
                    type="text"
                    name="rg"
                    value={employee.rg}
                    onChange={handleInputChange}
                />

                <AddressForm
                    onAddressChange={(address) =>
                        setEmployee((prev) => ({ ...prev, ...address }))
                    }
                />

                <ButtonForm>Cadastrar Funcionário</ButtonForm>
            </form>
        </section>
    );
};

export default AddEmployee;