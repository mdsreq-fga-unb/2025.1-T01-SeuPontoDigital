import "../pagesStyle.css";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import EmployerForm from "../../components/EmployerForm/index.jsx";
import usePostEmployer from "../../hooks/usePostEmployer.js";
import usePostAddress from "../../hooks/usePostAddress.js";
import Notification from "../../components/Notification";

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
        
        console.log("Submitting employer form with data:", employer);
        
        // Validação básica
        if (!employer.name || !employer.cpf || !employer.email || !employer.phone) {
            Notification.error("Preencha todos os campos obrigatórios!");
            return;
        }
        
        if (!employer.cep || !employer.street || !employer.house_number || !employer.city || !employer.uf || !employer.neighborhood) {
            Notification.error("Preencha todos os campos de endereço obrigatórios!");
            return;
        }
        
        try {
            const id_address = await postAddress(employer);
            
            if (!id_address) {
                Notification.error("Erro ao criar endereço!");
                return;
            }
            
            await postEmployer({ ...employer, id_address });
        } catch (error) {
            console.error("Error in form submission:", error);
            Notification.error("Erro inesperado ao criar empregador!");
        }
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
