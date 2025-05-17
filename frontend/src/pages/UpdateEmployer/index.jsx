import "../pagesStyle.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
import EmployerForm from "../../components/EmployerForm/index.jsx";
import Sidebar from "../../components/Sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import useFetchEmployer from "../../hooks/useFetchEmployer";
import usePutEmployer from "../../hooks/usePutEmployer.js";

const UpdateEmployer = () => {
    const { id } = useParams();
    const {fetchOneEmployer} = useFetchEmployer();
    const putEmployer = usePutEmployer();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
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

    useEffect(() => {
        const fetchEmployer = async () => {
            setEmployer(await fetchOneEmployer(id));
        };
        fetchEmployer();
    }, [id]);

    const handleInputUserChange = ({ name, value }) => {
        setEmployer((prev) => ({ ...prev, [name]: value }));
    };

    const closeModal = () => setModalOpen(false);

    const handleFormSubmit = async (passwordInput) => {
        putEmployer(employer, closeModal, passwordInput)
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-user-add">
            <form className="form-users">
                <EmployerForm employer={employer} handleInputChange={handleInputUserChange} />
                <AddressForm user={employer} handleInputChange={handleInputUserChange} />
            </form>
            <button onClick={() => setModalOpen(true)} className="button-add-employer-confirm"> Atualizar Empregador </button>

        </section>

                <ConfirmModal
                    isOpen={modalOpen}
                    onConfirm={ async (passwordInput) => {
                        setPassword(passwordInput);
                        await handleFormSubmit(passwordInput);
                    }}
                    onCancel={() => setModalOpen(false)}
                    message="Confirme sua senha para atualizar os dados de"
                    nameEmployer={employer.name}
                />
        </div>
    );
};

export default UpdateEmployer;