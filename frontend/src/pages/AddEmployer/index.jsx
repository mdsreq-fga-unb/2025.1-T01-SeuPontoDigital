import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import EmployerForm from "../../components/EmployerForm/index.jsx";
import usePostEmployer from "../../hooks/usePostEmployer.js";
import usePostAddress from "../../hooks/usePostAddress.js";

const AddEmployer = () => {
    const postEmployer = usePostEmployer();
    const postAddress = usePostAddress();

    const [employer, setEmployer] = useState({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        cep: "",
        street: "",
        house_number: "",
        city: "",
        uf: "",
        neighborhood: "",
        complement: "",
    });

    const handleInputUserChange = ({ name, value }) => {
        setEmployer((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const id_address = await postAddress(employer);
        await postEmployer({ ...employer, id_address });
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
            <form className="form-users">
                <EmployerForm employer={employer} handleInputChange={handleInputUserChange} />
            </form>
            <button onClick={handleFormSubmit} className="button-add-employer-confirm"> Cadastrar Empregador </button>

        </section>
        </div>
    );
};

export default AddEmployer;
