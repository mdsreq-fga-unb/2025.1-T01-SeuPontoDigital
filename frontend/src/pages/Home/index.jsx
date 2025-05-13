import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm"
import Footer from "../../components/Footer";

const Home = () => {
    return (
        <>
            <Header>
                <div className="container-header">
                    <img src="./images/seupontodigital.png"></img>
                    <h1>SeuPontoDigital</h1>
                </div> 
            </Header>
            <LoginForm/>
            <Footer/>
        </>
    )
}

export default Home;