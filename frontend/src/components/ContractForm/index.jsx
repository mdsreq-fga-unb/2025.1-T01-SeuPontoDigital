import TextInput from "../TextInput";
import "../../pages/pagesStyle.css"
import SearchInputAuto from "../SearchInputAuto";
import CheckBoxForm from "../CheckBoxForm";
import { useState } from "react";

const ContractForm = ({ user, handleInputChange, setEmpregadoIdContractForm, setEmpregadorIdContractForm, addContractCheckBox }) => {
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

    const contractFormCheckBox = (checked) => {
        addContractCheckBox(checked);
    }


    return (
        <div className="form-contract-inputs">
            {/* Elemento para selecionar empregador */}
            <SearchInputAuto itemName="Empregador" endpoint="/employers" onSelectId={handleEmpregadorSelect}/>
            <br></br>

            {/* Elemento para selecionar empregado */}
            <SearchInputAuto itemName="Empregado" endpoint="/employees" onSelectId={handleEmpregadoSelect}/>
            <br></br>

            {/* Ver se substitui function para role */}
            <TextInput label="Cargo" name="job_function" value={user.job_function} onChange={handleInputChange} 
            type="text"/>

            <TextInput label="Horas diárias" name="daily_hour" value={user.daily_hour} onChange={handleInputChange} type="number"/>

            <TextInput label="Número de dias" name="days_number" value={user.days_number} onChange={handleInputChange} type="number"/>

            <TextInput label="Horário de entrada" name="clock_in" value={user.clock_in} onChange={handleInputChange} type="time"/>

            <TextInput label="Horário de saída" name="clock_out" value={user.clock_out} onChange={handleInputChange} type="time"/>

            <TextInput label="Início do horário de almoço" name="break_start" value={user.break_start} onChange={handleInputChange} type="time"/>
            
            <TextInput label="Término do horário de almoço" name="break_end" value={user.break_end} onChange={handleInputChange} type="time"/>

            <TextInput label="Salário" name="salary" value={user.salary} onChange={handleInputChange} 
            type="number"/>

            <TextInput label="Dia de começo" name="date_start" value={user.date_start} onChange={handleInputChange} type="date"/>

            {/* <CheckBoxForm label="Status do contrato está ativo?" name="active" onCheck={contractFormCheckBox}/> */}
        </div>
    )
}

export default ContractForm;