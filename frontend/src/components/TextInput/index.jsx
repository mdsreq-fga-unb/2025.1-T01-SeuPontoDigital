import "./TextInput.css";

const TextInput = (props) => {

    return (
        <div className={props.className}>
            <label> {props.label}</label>
            <input {...props}/>
        </div>
    )
}
export default TextInput;