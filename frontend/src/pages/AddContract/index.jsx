import "../pagesStyle.css";
import { useState } from "react";
import AddressForm from "../../components/AddressForm";
import Sidebar from "../../components/Sidebar";
import EmployerForm from "../../components/EmployerForm/index.jsx";
import usePostEmployer from "../../hooks/usePostEmployer.js";

const AddContract = () => {
    const postEmployer = usePostEmployer();

    const [employer, setEmployer] = useState({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        cep: "",
        street: "",
        home_number: "",
        city: "",
        state: "",
        neighborhood: "",
        complement: "",
    });

    const handleInputUserChange = ({ name, value }) => {
        setEmployer((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        postEmployer(employer);
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <EmployerForm employer={employer} handleInputChange={handleInputUserChange} />
                    <AddressForm user={employer} handleInputChange={handleInputUserChange} />
                    
                </form>
                <button className="button-add-employer-confirm">Cadastrar Empregador</button>
            </section>
        </div>
    );
};

export default AddContract;
