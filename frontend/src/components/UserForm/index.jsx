import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"

const UserForm = ({ user, handleInputChange }) => {
    return (
        <div className="form-user-inputs">
            <TextInput label="Nome" name="name" value={user.name} onChange={handleInputChange} />

            <TextInput label="CPF" name="cpf" value={user.cpf} onChange={handleInputChange} />

            <TextInput label="Email" type="email" name="email" value={user.email} onChange={handleInputChange} />

            <TextInput label="Telefone" name="phone" value={user.phone} onChange={handleInputChange} />

            <TextInput label="Nacionalidade" name="nacionality" value={user.nacionality} onChange={handleInputChange} />

            <TextInput label="Estado Civil" name="marital_status" value={user.marital_status} onChange={handleInputChange} />

            <TextInput label="Profissão" name="occupation" value={user.occupation} onChange={handleInputChange} />

        </div>
    )
}

export default UserForm;