import { useState, useEffect } from "react";
import "./CheckBoxForm.css";

const CheckBoxForm = ({ label, checked, onCheck }) => {
    // Inicializa o estado local como o valor passado para a prop `checked` (booleano)
    const [isChecked, setIsChecked] = useState(checked);

    // Atualiza o estado local sempre que a prop `checked` mudar
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    // Função para atualizar o estado do checkbox
    const handleCheckboxChange = (event) => {
        const checkedValue = event.target.checked;
        setIsChecked(checkedValue);  // Atualiza o estado local (marcado ou desmarcado)
        // Chama a função onCheck (caso passada) para notificar o componente pai
        if (onCheck) {
            onCheck(checkedValue);  // Passa o valor (true ou false) para o componente pai
        }
    };

    return (
        <div className="container-checkbox-input">
            <label>{label}</label>
            <input 
                type="checkbox" 
                checked={isChecked} // O valor do checkbox é controlado pelo estado local
                onChange={handleCheckboxChange} // Atualiza o estado local quando o valor muda
            />
        </div>
    );
};

export default CheckBoxForm;