import "./ContractForm.css";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DaysOfWeekSelector from "../DaysOfWeekSelector";
import { useEffect } from "react";
import useFetchEmployer from "../../hooks/useFetchEmployer";

const ContractForm = (props) => {

    const work_schedule_type = [
        { value: "variavel", label: "Variável" },
        { value: "fixa", label: "Fixa" }
    ];

    const access_app = [
        {value: false, label: "Não"},
        {value: true, label: "Sim"}
        
    ];

    const workplace_employer = [
        {value: false, label: "Não"},
        {value: true, label: "Sim"}
    ];

    const {id} = useParams();

    const navigate = useNavigate();

    const handleButtonBack = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    const { fetchOneEmployer } = useFetchEmployer();

    useEffect(() => {
        const fillAddressFromEmployer = async () => {
            if (props.contract.workplace_employer === true || props.contract.workplace_employer === "true") {
                    const employer = await fetchOneEmployer(id);
                    if (employer) {
                        props.handleInputChange({ name: "cep", value: employer.cep || "" });
                        props.handleInputChange({ name: "street", value: employer.street || "" });
                        props.handleInputChange({ name: "neighborhood", value: employer.neighborhood || "" });
                        props.handleInputChange({ name: "city", value: employer.city || "" });
                        props.handleInputChange({ name: "state", value: employer.state || "" });
                        props.handleInputChange({ name: "home_number", value: employer.home_number || "" });
                        props.handleInputChange({ name: "complement", value: employer.complement || "" });
                    }
            }
        };
        fillAddressFromEmployer();
    }, [props.contract.workplace_employer]);

    const handleBlurCEP = (event) => {
        const cepValue = event.target.value?.replace(/[^0-9]/g, "");

        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    props.handleInputChange({ name: "street", value: data.logradouro });
                    props.handleInputChange({ name: "neighborhood", value: data.bairro });
                    props.handleInputChange({ name: "city", value: data.localidade });
                    props.handleInputChange({ name: "state", value: data.uf });
                })
                .catch((e) => console.error(e));
        }
    };

    return (
        <div>
            <button onClick={handleButtonBack} className="button-employer-form-back"><FaArrowLeft /></button>
            <div className="contract-form-grid">
            <TextInput
                label="Nome"
                name="name"
                type="text"
                value={props.contract.name}
                onChange={(e) => props.handleInputChange({ name: "name", value: e.target.value })}
                className="div-employer-form"
            />
            <TextInput
                label="CPF"
                name="cpf"
                type="text"
                value={props.contract.cpf}
                onChange={(e) => props.handleInputChange({ name: "cpf", value: e.target.value })}
                className="div-employer-form"
            />
            <TextInput
                label="Email"
                name="email"
                type="email"
                value={props.contract.email}
                onChange={(e) => props.handleInputChange({ name: "email", value: e.target.value })}
                className="div-employer-form"
            />
            <TextInput
                label="Telefone"
                name="phone"
                type="text"
                value={props.contract.phone}
                onChange={(e) => props.handleInputChange({ name: "phone", value: e.target.value })}
                className="div-employer-form"
            />
            <TextInput
                label="Função do empregado"
                name="job_function"
                type="text"
                value={props.contract.job_function}
                onChange={(e) => props.handleInputChange({ name: "job_function", value: e.target.value })}
                className="div-employer-form"
            />
            <TextInput
                label="Salário"
                name="salary"
                type="text"
                value={props.contract.salary}
                onChange={(e) => props.handleInputChange({ name: "salary", value: e.target.value })}
                className="div-employer-form"
            />
            <SelectInput
                label="Tipo de Jornada"
                name="work_schedule_type"
                value={props.contract.work_schedule_type}
                onChange={(e) => props.handleInputChange({ name: "work_schedule_type", value: e.target.value })}
                options={work_schedule_type}
                className="div-contract-select"
            />
            <TextInput
                label="Intervalo de Descanso"
                name="break_interval"
                type="time"
                value={props.contract.break_interval}
                onChange={(e) => props.handleInputChange({ name: "break_interval", value: e.target.value })}
                className="div-employer-form"
            />
            </div>
            <DaysOfWeekSelector
                selectedDays={props.contract.work_days || []}
                onChange={days => props.handleInputChange({ name: "work_days", value: days })}
                workScheduleType={props.contract.work_schedule_type}
            />
            <div className="contract-form-grid">
            <SelectInput
                label="Acesso ao aplicativo"
                name="access_app"
                value={props.contract.access_app}
                onChange={(e) => props.handleInputChange({ name: "access_app", value: Boolean(e.target.value) })}
                options={access_app}
                className="div-contract-select"
            />
             <SelectInput
                label="Local de trabalho na casa do Empregador"
                name="workplace_employer"
                value={props.contract.workplace_employer}
                onChange={(e) => props.handleInputChange({ name: "workplace_employer", value: Boolean(e.target.value) })}
                options={workplace_employer}
                className="div-contract-select"
            />
            <TextInput
                label="CEP"
                type="text"
                name="cep"
                placeholder=""
                className="div-address-form"
                value={props.contract.cep || ""}
                onChange={(e) => props.handleInputChange({ name: "cep", value: e.target.value })}
                onBlur={handleBlurCEP}
            />
            <TextInput
                label="Rua"
                type="text"
                name="street"
                placeholder=""
                className="div-address-form"
                value={props.contract.street || ""}
                onChange={(e) => props.handleInputChange({ name: "street", value: e.target.value })}
            />
            <TextInput
                label="Bairro"
                type="text"
                name="neighborhood"
                placeholder=""
                className="div-address-form"
                value={props.contract.neighborhood || ""}
                onChange={(e) => props.handleInputChange({ name: "neighborhood", value: e.target.value })}
            />
            <TextInput
                label="Cidade"
                type="text"
                name="city"
                placeholder=""
                className="div-address-form"
                value={props.contract.city || ""}
                onChange={(e) => props.handleInputChange({ name: "city", value: e.target.value })}
            />
            <TextInput
                label="Estado"
                type="text"
                name="state"
                placeholder=""
                className="div-address-form"
                value={props.contract.state || ""}
                onChange={(e) => props.handleInputChange({ name: "state", value: e.target.value })}
            />
            <TextInput
                label="Número"
                type="text"
                name="home_number"
                placeholder=""
                className="div-address-form"
                value={props.contract.home_number || ""}
                onChange={(e) => props.handleInputChange({ name: "home_number", value: e.target.value })}
            />
            <TextInput
                label="Complemento (opcional)"
                type="text"
                name="complement"
                placeholder=""
                className="div-address-form"
                value={props.contract.complement || ""}
                onChange={(e) => props.handleInputChange({ name: "complement", value: e.target.value })}
            />
            </div>
        </div>
    )
}

export default ContractForm;