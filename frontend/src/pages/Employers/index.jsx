import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import "../pagesStyle.css"

const Employers = () => {

    const fieldsTH = ["Nome", "CPF", "Telefone", "Profissão", "Email"];
    const fieldsTD = ["name", "cpf", "phone", "occupation", "email"];

    return(
        <div className="container-dashboard">
        <Sidebar/>
        <Table fieldsTH={fieldsTH} fieldsTD={fieldsTD} path={`${import.meta.env.VITE_API_URL}/employers`}/>
        </div>
    )

}

export default Employers;