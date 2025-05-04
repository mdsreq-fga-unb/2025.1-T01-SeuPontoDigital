import "./AddressForm.css";
import TextInput from "../TextInput";
import { useState } from "react";
import ButtonForm from "../ButtonForm";

const AddressForm = () => {

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    
    const handleBlurCEP = (event) => {
        const cep = event.target.value?.replace(/[^0-9]/g, "");
        if (cep.length === 8){
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                setStreet(data.logradouro);
                setNeighborhood(data.bairro);
                setCity(data.localidade);
                setState(data.estado);
            })
            .catch(e => console.error(e));
        }
    }

    const handleNumberAddress = (event) => setNumber(event.target.value);

    return (
       <div className="address-form-container">
        <TextInput label="CEP" type="text" onBlur={handleBlurCEP}/> 
        <TextInput label="Rua" type="text" value={street} readOnly/>
        <TextInput label="Número" type="text" value={number} onChange={handleNumberAddress}/>
        <TextInput label="Bairro" type="text" value={neighborhood} readOnly/>
        <TextInput label="Cidade" type="text" value={city} readOnly/> 
        <TextInput label="Estado" type="text" value={state} readOnly/>
        </div>
    )
}

export default AddressForm;
