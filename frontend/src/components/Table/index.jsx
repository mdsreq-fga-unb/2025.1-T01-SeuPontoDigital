import "./Table.css";
import { FaTrashCan, FaPenToSquare, FaUserPlus } from "react-icons/fa6";
import formatField from "../../services/formatField";
import { useLocation } from "react-router-dom";

const Table = (props) => {
    const location = useLocation();
    const isActive = location.pathname.match("empregadores")
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {props.fieldsHeader.map(field => (
                            <th>{field}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => (
                        <tr key={index}>
                            {props.fieldsData.map((field, i) => (
                                <td key={i}>
                                    {field === "name" && isActive ? (
                                        <button className="name-button" onClick={() => props.onNameClick(item)}  >
                                            {formatField(field, item[field])}
                                        </button>
                                    ) : (
                                        formatField(field, item[field])
                                    )}
                                </td>
                            ))}
                            <td>{ (isActive) ? <FaUserPlus onClick={() => props.onAddContract(item.id)} className="fa-add-contract" /> : ""
                                }
                                <FaPenToSquare onClick={() => props.onEdit(item.id)} className="fa-edit-employer" />
                                <FaTrashCan onClick={() => props.onDelete(item)} className="fa-delete-employer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
