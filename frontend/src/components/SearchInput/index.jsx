import "./SearchInput.css";
import { FaSearch } from "react-icons/fa";

const SearchInput = (props) => {
    return (
        <div className="container-search-input">
            <FaSearch className="search-icon" />
            <input type={props.type} className="search-input" placeholder="Buscar" value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default SearchInput;