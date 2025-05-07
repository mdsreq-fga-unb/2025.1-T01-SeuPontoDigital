import TextInput from "../TextInput";
import { useState } from "react";

const AddressForm = ({ user = {} }) => {
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [complement, setComplement] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleBlurCEP = (event) => {
        const cepValue = event.target.value?.replace(/[^0-9]/g, "");
        setCep(cepValue); // Atualiza o estado do CEP
        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    setStreet(data.logradouro);
                    setNeighborhood(data.bairro);
                    setCity(data.localidade);
                    setState(data.uf);
                })
                .catch((e) => console.error(e));
        }
    };

    const handleCepChange = (event) => setCep(event.target.value);
    const handleComplementAddress = (event) => setComplement(event.target.value);
    const handleNumberAddress = (event) => setNumber(event.target.value);

    return (
        <div>
            <TextInput
                label="CEP"
                type="text"
                value={cep || user.cep || ""} // Inclui o valor do CEP vindo de `user`
                onChange={handleCepChange}
                onBlur={handleBlurCEP}
            />
            <TextInput label="Rua" type="text" value={street || user.street || ""} readOnly />
            <TextInput label="Complemento (opcional)" type="text" value={complement} onChange={handleComplementAddress} />
            <TextInput label="Número" type="text" value={number || user.home_number || ""} onChange={handleNumberAddress} />
            <TextInput label="Bairro" type="text" value={neighborhood || user.neighborhood || ""} readOnly />
            <TextInput label="Cidade" type="text" value={city || user.city || ""} readOnly />
            <TextInput label="Estado" type="text" value={state || user.state || ""} readOnly />
        </div>
    );
};

export default AddressForm;