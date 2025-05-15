import TextInput from "../TextInput";

const WorkCardForm = ({ user, handleInputChange, children}) => {

    return (
        <div className="form-user-inputs">
            <TextInput label="Número" name="number_work_card" value={user.number_work_card} onChange={handleInputChange} />

            <TextInput label="Série" name="serie_work_card" value={user.serie_work_card} onChange={handleInputChange} />

            <TextInput label="UF" name="uf_work_card" value={user.uf_work_card} onChange={handleInputChange} />
            
            {children}
        </div>
    )
}

export default WorkCardForm;