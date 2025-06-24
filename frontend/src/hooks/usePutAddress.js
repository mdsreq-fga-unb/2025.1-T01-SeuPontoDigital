import axios from "axios";
import handleError from "../services/errors";

const usePutAddress = () => {

    const putAddress = async (addressId, addressData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/address/${addressId}`, 
                addressData, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (err) {
            handleError(err.response?.data.message || err.response?.data.errors);
            throw err;
        }
    }
    
    return putAddress;
}

export default usePutAddress;
