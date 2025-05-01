import "./ButtonLogin.css"

const ButtonLogin = (props) => {
    return (
        <div className="div-button-login">
            <button>{props.children}</button>
        </div>
    )
}

export default ButtonLogin;