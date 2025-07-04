import "./ContractForm.css";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DaysOfWeekSelector from "../DaysOfWeekSelector";
import { useEffect } from "react";
import useFetchEmployer from "../../hooks/useFetchEmployer";
import Notification from "../Notification";
import formatField from "../../services/formatField";

const ContractForm = (props) => {

    const idEmployer = props.id;

    const work_schedule_type = [
        { value: "variavel", label: "Variável" },
        { value: "fixa", label: "Fixa" }
    ];

    const app_access = [
        { value: "false", label: "Não" },
        { value: "true", label: "Sim" }
    ];

    const workplace_employer = [
        { value: "false", label: "Não" },
        { value: "true", label: "Sim" }
    ];

    const { id } = useParams();

    const navigate = useNavigate();

    const handleButtonBack = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    const handleBreakIntervalChange = (e) => {
        const value = e.target.value;
        const [hours, minutes] = value.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const minMinutes = 15;
        const maxMinutes = 2 * 60;

        if (totalMinutes >= minMinutes && totalMinutes <= maxMinutes) {
            props.handleInputChange({ name: "break_interval", value });
        } else {
            Notification.error("Intervalo de descanso deve estar entre 00h15 e 02h00!");
        }
    };

    const { fetchOneEmployer } = useFetchEmployer();

    useEffect(() => {
        const fillAddressFromEmployer = async () => {
            if (props.contract.workplace_employer === true || props.contract.workplace_employer === "true") {
                const employer = await fetchOneEmployer(idEmployer || id);
                if (employer) {
                    props.handleInputChange({ name: "workplace_cep", value: employer.cep || "" });
                    props.handleInputChange({ name: "workplace_street", value: employer.street || "" });
                    props.handleInputChange({ name: "workplace_neighborhood", value: employer.neighborhood || "" });
                    props.handleInputChange({ name: "workplace_city", value: employer.city || "" });
                    props.handleInputChange({ name: "workplace_state", value: employer.uf || "" });
                    props.handleInputChange({ name: "workplace_home_number", value: employer.house_number || "" });
                    props.handleInputChange({ name: "workplace_complement", value: employer.complement || "" });
                }
            }
        };
        // Só executa se workplace_employer for true e os campos de endereço estiverem vazios
        if ((props.contract.workplace_employer === true || props.contract.workplace_employer === "true") && 
            !props.contract.workplace_cep) {
            fillAddressFromEmployer();
        }
    }, [props.contract.workplace_employer, fetchOneEmployer, idEmployer, id, props.contract.workplace_cep]);

    const handleBlurCEP = (event) => {
        const cepValue = event.target.value?.replace(/[^0-9]/g, "");

        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    props.handleInputChange({ name: "workplace_street", value: data.logradouro });
                    props.handleInputChange({ name: "workplace_neighborhood", value: data.bairro });
                    props.handleInputChange({ name: "workplace_city", value: data.localidade });
                    props.handleInputChange({ name: "workplace_state", value: data.uf });
                })
                .catch((e) => console.error(e));
        }
    };

    const isEmployerAddress = props.contract.workplace_employer === true;

    return (
        <div>
            <button onClick={handleButtonBack} className="button-employer-form-back"><FaArrowLeft /></button>
            <div className="contract-form-grid">
                <TextInput
                    label="Nome do Empregado"
                    name="name"
                    type="text"
                    value={props.contract.name}
                    onChange={(e) => props.handleInputChange({ name: "name", value: e.target.value })}
                    className="div-employer-form"
                />
                <TextInput
                    label="CPF do Empregado"
                    name="cpf"
                    type="text"
                    value={props.contract.cpf}
                    onChange={(e) => props.handleInputChange({ name: "cpf", value: formatField("cpf2", e.target.value) })}
                    className="div-employer-form"
                />
                <TextInput
                    label="Telefone do Empregado"
                    name="phone"
                    type="text"
                    value={props.contract.phone}
                    onChange={(e) => props.handleInputChange({ name: "phone", value: formatField("phone2", e.target.value) })}
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
                    label="Salário do Empregado"
                    name="salary"
                    type="text"
                    value={props.contract.salary}
                    onChange={(e) => props.handleInputChange({ name: "salary", value: (e.target.value) })}
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

                {/* NOVO BLOCO: Tipo de intervalo e campos condicionais */}
                <SelectInput
                    label="Tipo de Intervalo"
                    name="break_type"
                    value={props.contract.break_type}
                    onChange={e => props.handleInputChange({ name: "break_type", value: e.target.value })}
                    options={[
                        { value: "fixed", label: "Duração fixa" },
                        { value: "range", label: "Horário de início/fim" }
                    ]}
                    className="div-contract-select"
                />

                {props.contract.break_type === "fixed" ? (
                    <TextInput
                        label="Duração do Intervalo"
                        name="break_interval"
                        type="time"
                        min="00:15"
                        max="02:00"
                        value={props.contract.break_interval}
                        onChange={handleBreakIntervalChange}
                        className="div-employer-form"
                    />
                ) : (
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <TextInput
                            label="Início do Intervalo"
                            name="break_start"
                            type="time"
                            value={props.contract.break_start}
                            onChange={e => props.handleInputChange({ name: "break_start", value: e.target.value })}
                            className="div-employer-form"
                        />
                        <TextInput
                            label="Fim do Intervalo"
                            name="break_end"
                            type="time"
                            value={props.contract.break_end}
                            onChange={e => props.handleInputChange({ name: "break_end", value: e.target.value })}
                            className="div-employer-form"
                        />
                    </div>
                )}
                {/* FIM DO NOVO BLOCO */}
            </div>
            <DaysOfWeekSelector
                selectedDays={props.contract.work_days || []}
                onChange={days => props.handleInputChange({ name: "work_days", value: days })}
                workScheduleType={props.contract.work_schedule_type}
            />
            <div className="contract-form-grid">
                <SelectInput
                    label="Acesso ao aplicativo"
                    name="app_access"
                    value={String(props.contract.app_access)}
                    onChange={(e) => props.handleInputChange({ name: "app_access", value: e.target.value === "true" })}
                    options={app_access}
                    className="div-contract-select"
                />
                <SelectInput
                    label="Local de trabalho na casa do Empregador"
                    name="workplace_employer"
                    value={String(props.contract.workplace_employer)}
                    onChange={(e) => props.handleInputChange({ name: "workplace_employer", value: e.target.value === "true" })}
                    options={workplace_employer}
                    className="div-contract-select"
                />
                <TextInput
                    label="CEP"
                    type="text"
                    name="workplace_cep"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_cep || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_cep", value: formatField("cep", e.target.value) })}
                    onBlur={handleBlurCEP}
                    disabled={isEmployerAddress}
                />
                <TextInput
                    label="Rua"
                    type="text"
                    name="workplace_street"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_street || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_street", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
                <TextInput
                    label="Bairro"
                    type="text"
                    name="workplace_neighborhood"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_neighborhood || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_neighborhood", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
                <TextInput
                    label="Cidade"
                    type="text"
                    name="workplace_city"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_city || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_city", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
                <TextInput
                    label="Estado"
                    type="text"
                    name="workplace_state"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_state || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_state", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
                <TextInput
                    label="Número"
                    type="text"
                    name="workplace_home_number"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_home_number || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_home_number", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
                <TextInput
                    label="Complemento (opcional)"
                    type="text"
                    name="workplace_complement"
                    placeholder=""
                    className="div-address-form"
                    value={props.contract.workplace_complement || ""}
                    onChange={(e) => props.handleInputChange({ name: "workplace_complement", value: e.target.value })}
                    disabled={props.contract.workplace_employer}
                />
            </div>
        </div>
    )
}

export default ContractForm;