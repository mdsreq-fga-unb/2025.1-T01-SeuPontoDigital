import "./TextInput.css"

const TextInput = ({label,type, value, onChange}) => {

    const handleInputChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <div className="text-input">
            <label>{label}</label>
            <input type={type} value={value} onChange={handleInputChange}/>
        </div>
    )
}

export default TextInput;
