import "./ButtonLogin.css"

const ButtonLogin = ({ children, ...props }) => {
    return (
        <div className="div-button-login">
            <button {...props}>{children}</button>
        </div>
    )
}

export default ButtonLogin;