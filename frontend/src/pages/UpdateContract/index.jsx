import "../pagesStyle.css";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import useFetchContract from "../../hooks/useFetchContract.js";
import usePutContract from "../../hooks/usePutContract.js";
import ContractForm from "../../components/ContractForm/index.jsx";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";

const UpdateContract = () => {
    const putContract = usePutContract();
    const {fetchOneContract} = useFetchContract();
    const {id} = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [contract, setContract] = useState({
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

    useEffect(() => {
            const fetchContract = async () => {
                setContract(await fetchOneContract(id));
            };
            fetchContract();
        }, [id]);

    const handleInputUserChange = ({ name, value }) => {
        setContract((prev) => ({ ...prev, [name]: value }));
    };

    const closeModal = () => setModalOpen(false);

    const handleFormSubmit = async (passwordInput) => {
        putContract(contract, closeModal, passwordInput)
    };

    return (
        <div className="container-dashboard">
            <Sidebar />
            <section className="form-contract-add">
                <form className="form-users">
                    <ContractForm contract={contract} handleInputChange={handleInputUserChange} id={contract.employer_id}/>
                </form>
                <button onClick={() => setModalOpen(true)} className="button-add-employer-confirm">Atualizar Contrato</button>
            </section>
            <ConfirmModal
                    isOpen={modalOpen}
                    onConfirm={ async (passwordInput) => {
                        setPassword(passwordInput);
                        await handleFormSubmit(passwordInput);
                    }}
                    onCancel={() => setModalOpen(false)}
                    message="Confirme sua senha para atualizar os dados do contrato de"
                    nameEmployer={contract.name}
                />
        </div>
    );
};

export default UpdateContract;
