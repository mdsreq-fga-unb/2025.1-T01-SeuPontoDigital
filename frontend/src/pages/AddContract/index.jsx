import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import usePostEmployer from "../../hooks/usePostEmployer.js";
import ContractForm from "../../components/ContractForm/index.jsx";


const AddContract = () => {
    const postEmployer = usePostEmployer();
    
    const [contract, setContract] = useState({
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
        setContract((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        postEmployer(contract);
    };
    
    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form onSubmit={handleFormSubmit} className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} />
                </form>
                <button className="button-add-employer-confirm">Cadastrar Contrato</button>
            </section>
        </div>
    );
};

export default AddContract;
