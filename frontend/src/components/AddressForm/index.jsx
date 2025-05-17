import TextInput from "../TextInput";
import "./AddressForm.css";

const AddressForm = (props) => {

    const handleBlurCEP = (event) => {
        const cepValue = event.target.value?.replace(/[^0-9]/g, "");
        // props.handleInputChange({ name: "cep", value: cepValue });

        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    props.handleInputChange({ name: "street", value: data.logradouro });
                    props.handleInputChange({ name: "neighborhood", value: data.bairro });
                    props.handleInputChange({ name: "city", value: data.localidade });
                    props.handleInputChange({ name: "state", value: data.uf });
                })
                .catch((e) => console.error(e));
        }
    };

    return (
        <div className="container-address-form">
            <TextInput
                label="CEP"
                type="text"
                name="cep"
                placeholder=""
                className="div-address-form"
                value={props.user.cep || ""}
                onChange={(e) => props.handleInputChange({ name: "cep", value: e.target.value })}
                onBlur={handleBlurCEP}
            />
            <TextInput
                label="Rua"
                type="text"
                name="street"
                placeholder=""
                className="div-address-form"
                value={props.user.street || ""}
                onChange={(e) => props.handleInputChange({ name: "street", value: e.target.value })}
            />
            <TextInput
                label="Bairro"
                type="text"
                name="neighborhood"
                placeholder=""
                className="div-address-form"
                value={props.user.neighborhood || ""}
                onChange={(e) => props.handleInputChange({ name: "neighborhood", value: e.target.value })}
            />
            <TextInput
                label="Cidade"
                type="text"
                name="city"
                placeholder=""
                className="div-address-form"
                value={props.user.city || ""}
                onChange={(e) => props.handleInputChange({ name: "city", value: e.target.value })}
            />
            <TextInput
                label="Estado"
                type="text"
                name="state"
                placeholder=""
                className="div-address-form"
                value={props.user.state || ""}
                onChange={(e) => props.handleInputChange({ name: "state", value: e.target.value })}
            />
            <TextInput
                label="Número"
                type="text"
                name="home_number"
                placeholder=""
                className="div-address-form"
                value={props.user.home_number || ""}
                onChange={(e) => props.handleInputChange({ name: "home_number", value: e.target.value })}
            />
            <TextInput
                label="Complemento (opcional)"
                type="text"
                name="complement"
                placeholder=""
                className="div-address-form"
                value={props.user.complement || ""}
                onChange={(e) => props.handleInputChange({ name: "complement", value: e.target.value })}
            />
        </div>
    );
};

export default AddressForm;
