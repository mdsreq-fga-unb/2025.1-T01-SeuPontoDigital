import axios from "axios";

const loginAdmin = async (email, password) => {
    const URL = `${import.meta.env.VITE_API_URL}/api/login`

    try{
        const response = await axios.post(URL, {email, password});
        return response.data;
    }
    catch(err){
        console.error("error:", err);
        throw err;
    }
}

export default loginAdmin;