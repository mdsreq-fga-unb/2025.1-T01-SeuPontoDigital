import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"
import SearchInputAuto from "../SearchInputAuto";

const ContractForm = ({ user, handleInputChange }) => {
    return (
        <div className="form-contract-inputs">
            {/* Elemento para selecionar empregador */}
            <SearchInputAuto itemName="Empregador" endpoint="/employers"/>

            {/* Elemento para selecionar empregado */}
            <SearchInputAuto itemName="Empregado" endpoint="/employees"/>

            {/* Ver se substitui function para role */}
            <TextInput label="Cargo" name="function" value={user.function} onChange={handleInputChange} />

            <TextInput label="Horas diárias" name="daily_hour" value={user.daily_hour} onChange={handleInputChange} />

            <TextInput label="Número de dias" name="days_number" value={user.days_number} onChange={handleInputChange} />

            <TextInput label="Horário de entrada" name="clock_in" value={user.clock_in} onChange={handleInputChange} />

            <TextInput label="Horário de saída" name="clock_out" value={user.clock_out} onChange={handleInputChange} />

            <TextInput label="Horário de almoço" name="break_time" value={user.break_time} onChange={handleInputChange} />

            <TextInput label="Salário" name="salary" value={user.salary} onChange={handleInputChange} />

            <TextInput label="Dia de começo" name="date_start" value={user.date_start} onChange={handleInputChange} />
        </div>
    )
}

export default ContractForm;