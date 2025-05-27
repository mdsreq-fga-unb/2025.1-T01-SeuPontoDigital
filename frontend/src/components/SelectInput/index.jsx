import "./SelectInput.css";

const SelectInput = (props) => {
    return (
        <div className={props.className}>
            <label>{props.label}</label>
            <select {...props}>
                {props.options && props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput;