import "../pagesStyle.css"
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import ButtonAdd from "../../components/ButtonAdd";

const Employees = () => {

    const fieldsTH = ["Nome", "CPF", "Telefone", "Profissão", "Email"]; // header
    const fieldsTD = ["name", "cpf", "phone", "occupation", "email"]; // rows

    return (
        <div className="container-dashboard">
            <Sidebar />
            <div className="container-table-pages">
                <div className="container-search-button">
                    <ButtonAdd>Adicionar Empregado</ButtonAdd>
                    <SearchInput type="search" />
                </div>
                <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} path={`${import.meta.env.VITE_API_URL}/employees`} />
            </div>
        </div>
    )
}

export default Employees;