import "./Button.css"

const Button = ({ children, ...props }) => {
    return (
        <div className="div-button">
            <button {...props}>{children}</button>
        </div>
    )
}

export default Button;