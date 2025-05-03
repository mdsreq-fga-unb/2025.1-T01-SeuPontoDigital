import "./Dashboard.css"
import ButtonLogout from "../ButtonLogout";
import Sidebar from "../Sidebar";

const Dashboard = () => {
    return (
        <>  
            <Sidebar/>
            <div className="container-dashboard">
                <h1>Dashboard</h1>
                <ButtonLogout>Sair</ButtonLogout>
            </div> 
        </>
)
}
export default Dashboard;