import "./TextInput.css";

const TextInput = (props) => {

    return (
        <div className={props.className}>
            <label> {props.label}</label>
            <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
    )
}
export default TextInput;