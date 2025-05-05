import "./Header.css"

const Header = (props) => {
    return (
        <header className="container-main-header">
            {props.children}
        </header>
    )
}

export default Header;