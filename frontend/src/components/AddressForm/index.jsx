import TextInput from "../TextInput";

const AddressForm = ({ user, handleInputChange }) => {
    const handleBlurCEP = (event) => {
        const cepValue = event.target.value?.replace(/[^0-9]/g, "");
        handleInputChange({ cep: cepValue }); 
        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    handleInputChange({
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf,
                    });
                })
                .catch((e) => console.error(e));
        }
    };

    return (
        <div>
            <TextInput
                label="CEP"
                type="text"
                value={user.cep || ""}
                onChange={(e) => handleInputChange({ cep: e.target.value })}
                onBlur={handleBlurCEP}
            />
            <TextInput
                label="Rua"
                type="text"
                value={user.street || ""}
                onChange={(e) => handleInputChange({ street: e.target.value })}
            />
            <TextInput
                label="Complemento (opcional)"
                type="text"
                value={user.complement || ""}
                onChange={(e) => handleInputChange({ complement: e.target.value })}
            />
            <TextInput
                label="Número"
                type="text"
                value={user.home_number || ""}
                onChange={(e) => handleInputChange({ home_number: e.target.value })}
            />
            <TextInput
                label="Bairro"
                type="text"
                value={user.neighborhood || ""}
                readOnly
            />
            <TextInput
                label="Cidade"
                type="text"
                value={user.city || ""}
                readOnly
            />
            <TextInput
                label="Estado"
                type="text"
                value={user.state || ""}
                readOnly
            />
        </div>
    );
};

export default AddressForm;