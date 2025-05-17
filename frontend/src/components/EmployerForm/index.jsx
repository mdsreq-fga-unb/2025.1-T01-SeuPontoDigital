import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"

const EmployerForm = (props) => {
    return (
        <>
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
                label="CPF" 
                name="cpf"
                type="text"
                value={props.employer.cpf} 
                onChange={(e) => props.handleInputChange({ name: "cpf", value: e.target.value })}
                placeholhder="CPF do empregador"
                className="div-employer-form"
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
                label="Telefone" 
                name="phone"
                type="text"
                value={props.employer.phone} 
                onChange={(e) => props.handleInputChange({ name: "phone", value: e.target.value })}
                placeholhder="Número do empregador"
                className="div-employer-form"
            />
            
        </>
    )
}

export default EmployerForm;