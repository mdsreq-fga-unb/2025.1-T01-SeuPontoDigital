import "./ButtonForm.css"

const ButtonForm = (props) => {
    return (
        <div className="div-button-login">
            <button>{props.children}</button>
        </div>
    )
}

export default ButtonForm;