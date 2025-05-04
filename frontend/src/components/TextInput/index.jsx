import "./TextInput.css";

const TextInput = (props) => {

    return (
        <div className="div-text-input">
            <label> {props.label}</label>
            <input {...props}/>
        </div>
    )
}
export default TextInput;