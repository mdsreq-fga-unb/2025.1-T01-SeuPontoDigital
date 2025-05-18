import "./EmployerForm.css";
import TextInput from "../TextInput";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EmployerForm = (props) => {
    const navigate = useNavigate();

    const formatCPF = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        const masked = cleaned
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        return masked;
    };

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const masked = cleaned
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
        return masked;
    };

    const formatCEP = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 8);
        const masked = cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
        return masked;
    };

    const handleButtonBack = (event) => {
        event.preventDefault();
        navigate(-1);
    }

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
        <div className="container-employer-form">

            <button onClick={handleButtonBack} className="button-employer-form-back"><FaArrowLeft /></button>
            <div className="container-employer-form-grid">
                <TextInput
                    label="Nome"
                    name="name"
                    type="text"
                    value={props.employer.name}
                    onChange={(e) => props.handleInputChange({ name: "name", value: e.target.value })}
                    placeholhder="Nome do empregador"
                    className="div-employer-form"
                />
                <TextInput
                    label="CEP"
                    type="text"
                    name="cep"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.cep || ""}
                    onChange={(e) => props.handleInputChange({ name: "cep", value: formatCEP(e.target.value) })}
                    onBlur={handleBlurCEP}
                />
                <TextInput
                    label="Estado"
                    type="text"
                    name="state"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.state || ""}
                    onChange={(e) => props.handleInputChange({ name: "state", value: e.target.value })}
                />
                <TextInput
                    label="CPF"
                    name="cpf"
                    type="text"
                    value={props.employer.cpf}
                    onChange={(e) => props.handleInputChange({ name: "cpf", value: formatCPF(e.target.value) })}
                    placeholhder="CPF do empregador"
                    className="div-employer-form"
                />
                <TextInput
                    label="Rua"
                    type="text"
                    name="street"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.street || ""}
                    onChange={(e) => props.handleInputChange({ name: "street", value: e.target.value })}
                />
                <TextInput
                    label="Bairro"
                    type="text"
                    name="neighborhood"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.neighborhood || ""}
                    onChange={(e) => props.handleInputChange({ name: "neighborhood", value: e.target.value })}
                />
                <TextInput
                    label="Telefone"
                    name="phone"
                    type="text"
                    value={props.employer.phone}
                    onChange={(e) => props.handleInputChange({ name: "phone", value: formatPhone(e.target.value) })}
                    placeholhder="Número do empregador"
                    className="div-employer-form"
                />
                <TextInput
                    label="Cidade"
                    type="text"
                    name="city"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.city || ""}
                    onChange={(e) => props.handleInputChange({ name: "city", value: e.target.value })}
                />
                <TextInput
                    label="Número"
                    type="text"
                    name="home_number"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.home_number || ""}
                    onChange={(e) => props.handleInputChange({ name: "home_number", value: e.target.value })}
                />
                <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    value={props.employer.email}
                    onChange={(e) => props.handleInputChange({ name: "email", value: e.target.value })}
                    placeholhder="Email do empregador"
                    className="div-employer-form"
                />
                <TextInput
                    label="Complemento (opcional)"
                    type="text"
                    name="complement"
                    placeholder=""
                    className="div-address-form"
                    value={props.employer.complement || ""}
                    onChange={(e) => props.handleInputChange({ name: "complement", value: e.target.value })}
                />
            </div>
        </div>
    )
}

export default EmployerForm;