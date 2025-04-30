import "./TextInput.css";

const TextInput = (props) =>{

    const handleInputChange = (event) => {
        props.onChange(event.target.value);
    }
    return (
        <div className="div-text-input">
            <label> {props.label}</label>
            <input type={props.type} value={props.value} onChange={handleInputChange}/>
        </div>
    )
}
export default TextInput