import "./Sidebar.css"

const Sidebar = () => {
    const name = localStorage.getItem("name");

    return(
        <nav className="sidebar-nav">
            <div>
                <img src="../../public/images/seupontodigital.png"/>
                <p>SeuPontoDigital</p>
            </div>
        </nav>
    )
}

export default Sidebar;