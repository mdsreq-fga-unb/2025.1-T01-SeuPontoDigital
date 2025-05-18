import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import usePostContract from "../../hooks/usePostContract.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams } from "react-router-dom";

const AddContract = () => {
    const postContract = usePostContract();
    const {id} = useParams();
    const [contract, setContract] = useState({
        employer_id: id,
        name: "",
        cpf: "",
        phone: "",
        email: "",
        job_function: "",
        work_schedule_type: "",
        break_interval: "",
        work_days: "",
        salary: "",
        app_access:"",
        workplace_employer: "",
        workplace_cep: "",
        workplace_street: "",
        workplace_home_number: "",
        workplace_city: "",
        workplace_state: "",
        workplace_neighborhood: "",
        workplace_complement: "",
    });

    const handleInputUserChange = ({ name, value }) => {
        setContract((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        postContract(contract);
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} />
                </form>
                <button onClick={handleFormSubmit} className="button-add-employer-confirm">Cadastrar Contrato</button>
            </section>
        </div>
    );
};

export default AddContract;
