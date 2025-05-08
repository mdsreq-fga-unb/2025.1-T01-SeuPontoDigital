import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import "./SearchInputAuto.css";

const SearchInputAuto = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

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

    // Quando o valor é alterado no autocomplete, atualiza o estado do id
    const handleSelect = (event, newValue) => {
        if (newValue) {
            const person = searchData.find(user => user.name === newValue);
            
            props.onSelectId(person.id); // Passa o ID de volta para o ContractForm
        } else {
            setSearchTerm('');
            setSelectedId(null);
            props.onSelectId(null); // Limpa o ID se necessário
        }
    };

    return (
        <div className="container-searchinputauto-input">
            <label>{props.itemName}</label>
            <br></br>
            <Autocomplete
                value={searchTerm}
                onInputChange={(e, newValue) => setSearchTerm(newValue)}
                options={searchData.map((searchData) => searchData.name)}
                onChange={handleSelect}
                // renderInput={(params) => <TextField {...params} label={`Procure por ${props.itemName}`} />}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
};

export default SearchInputAuto