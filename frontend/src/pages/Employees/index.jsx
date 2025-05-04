import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const fieldsTH = ["Nome", "CPF", "Telefone", "Profissão", "Email"];
    const fieldsTD = ["name", "cpf", "phone", "occupation", "email"];

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRequest = (item) => {
        setEmployeeToDelete(item);
        setModalOpen(true);
    };

    // ============================== FETCH EMPLOYEES ==============================

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/employees`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
        } catch (err) {
            console.error("error:", err);
        }
    };

    // ============================== DELETE EMPLOYEE ==============================

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/employee/${employeeToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setModalOpen(false);
            setEmployeeToDelete(null);
            fetchData();
        } catch (err) {
            console.error("error:", err);
        }
    };
    const handleCancelDelete = () => {
        setModalOpen(false);
        setEmployeeToDelete(null);
    };

    // ============================== RETURN JSX ==============================

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd>Adicionar Empregado</ButtonAdd>
                    <SearchInput type="search" />
                </div>
                <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} data={data} onDelete={handleDeleteRequest} />

                <ConfirmModal isOpen={modalOpen} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} message={`Deseja realmente excluir o empregado ${employeeToDelete?.name}?`} />
            </div>
        </div>
    );
};

export default Employees;
