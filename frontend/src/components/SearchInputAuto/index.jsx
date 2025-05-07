import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const SearchInputAuto = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchSearchData();
        }
    }, [searchTerm]);

    const fetchSearchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${props.endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            }); 
            setSearchData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Autocomplete
                value={searchTerm}
                onInputChange={(e, newValue) => setSearchTerm(newValue)}
                options={searchData.map((searchData) => searchData.name)}
                renderInput={(params) => <TextField {...params} label={`Procure por ${props.itemName}`} />}
            />
        </div>
    );
};

export default SearchInputAuto