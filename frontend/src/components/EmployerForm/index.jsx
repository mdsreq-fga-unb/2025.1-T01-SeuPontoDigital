import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"

const EmployerForm = ({ user, handleInputChange }) => {
    return (
        <div className="form-user-inputs">
            <TextInput label="Nome" name="name" value={user.name} onChange={handleInputChange} />

            <TextInput label="CPF" name="cpf" value={user.cpf} onChange={handleInputChange} />

            <TextInput label="Email" type="email" name="email" value={user.email} onChange={handleInputChange} />

            <TextInput label="Telefone" name="phone" value={user.phone} onChange={handleInputChange} />
        </div>
    )
}

export default EmployerForm;