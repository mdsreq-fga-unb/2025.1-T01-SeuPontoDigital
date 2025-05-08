import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"
import SearchInputAuto from "../SearchInputAuto";
import { useState } from "react";

const ContractForm = ({ user, handleInputChange, setEmpregadoIdContractForm, setEmpregadorIdContractForm }) => {
    const [empregadorId, setEmpregadorId] = useState(null);
    const [empregadoId, setEmpregadoId] = useState(null);

    const handleEmpregadorSelect = (id) => {
        setEmpregadorId(id); 
        //props.setEmpregadorIdContractForm(id);
        setEmpregadorIdContractForm(id);
    };

    const handleEmpregadoSelect = (id) => {
        setEmpregadoId(id);
        //props.setEmpregadoIdContractForm(id);
        setEmpregadoIdContractForm(id);
    };

    return (
        <div className="form-contract-inputs">
            {/* Elemento para selecionar empregador */}
            <SearchInputAuto itemName="Empregador" endpoint="/employers" onSelectId={handleEmpregadorSelect}/>

            {/* Elemento para selecionar empregado */}
            <SearchInputAuto itemName="Empregado" endpoint="/employees" onSelectId={handleEmpregadoSelect}/>

            {/* Ver se substitui function para role */}
            <TextInput label="Cargo" name="function" value={user.function} onChange={handleInputChange} />

            <TextInput label="Horas diárias" name="daily_hour" value={user.daily_hour} onChange={handleInputChange} />

            <TextInput label="Número de dias" name="days_number" value={user.days_number} onChange={handleInputChange} />

            <TextInput label="Horário de entrada" name="clock_in" value={user.clock_in} onChange={handleInputChange} />

            <TextInput label="Horário de saída" name="clock_out" value={user.clock_out} onChange={handleInputChange} />

            <TextInput label="Início do horário de almoço" name="break_start" value={user.break_start} onChange={handleInputChange} />
            
            <TextInput label="Término do horário de almoço" name="break_end" value={user.break_end} onChange={handleInputChange} />

            <TextInput label="Salário" name="salary" value={user.salary} onChange={handleInputChange} />

            <TextInput label="Dia de começo" name="date_start" value={user.date_start} onChange={handleInputChange} />

            <label>
                <input type="checkbox" name="acceptTerms" value="yes" />
                Aceito os Termos e Condições
            </label>
        </div>
    )
}

export default ContractForm;