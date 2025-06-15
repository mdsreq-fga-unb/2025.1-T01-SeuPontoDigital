import "../pagesStyle.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import EmployerForm from "../../components/EmployerForm/index.jsx";
import Sidebar from "../../components/Sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import useFetchEmployer from "../../hooks/useFetchEmployer";
import usePutEmployer from "../../hooks/usePutEmployer.js";

const UpdateEmployer = () => {
    const { id } = useParams();
    const { fetchOneEmployer } = useFetchEmployer();
    const putEmployer = usePutEmployer();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [employer, setEmployer] = useState({
        id: "",
        id_address: "",
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

    const removeDDI = (phone) => {
        if (!phone || typeof phone !== "string") return "";
        return phone.replace(/^(\+55|55)/, "");
    }

    const loadEmployerData = useCallback(async () => {
        const employerData = await fetchOneEmployer(id);
        if (employerData) {
            setEmployer({
                id: employerData.id,
                id_address: employerData.id_address || "",
                name: employerData.name || "",
                cpf: employerData.cpf || "",
                email: employerData.email || "",
                phone: removeDDI(employerData.phone) || "",
                cep: employerData.cep || "",
                street: employerData.street || "",
                house_number: employerData.house_number || "",
                city: employerData.city || "",
                uf: employerData.uf || "",
                neighborhood: employerData.neighborhood || "",
                complement: employerData.complement || "",
            });
        }
    }, [id, fetchOneEmployer]);

    useEffect(() => {
        loadEmployerData();
    }, [loadEmployerData]);

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
                </form>
                <button onClick={() => setModalOpen(true)} className="button-add-employer-confirm"> Atualizar Empregador </button>

            </section>

            <ConfirmModal
                isOpen={modalOpen}
                onConfirm={async (passwordInput) => {
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