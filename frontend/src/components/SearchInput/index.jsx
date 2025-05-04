import "./SearchInput.css";
import { FaSearch } from "react-icons/fa";

const SearchInput = (props) => {
    return (
        <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input type={props.type} className="search-input" />
        </div>
    )
}

export default SearchInput;