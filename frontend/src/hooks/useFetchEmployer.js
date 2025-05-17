import axios from "axios";

const useFetchEmployer = () => {

    const fetchEmployer = async () => {

    const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data
        } catch (err) {
            return null;
        }
    }
    return fetchEmployer;
}

export default useFetchEmployer;