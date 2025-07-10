import "./ButtonGenerateFile.css"

const ButtonGenerateFile = (props) => {
    const className = `container-button-generate ${props.fileType || ""}` 
    return (
        <div className={className}>
            <button onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}

export default ButtonGenerateFile;