import "./Table.css";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import formatField from "../../services/formatField";
import { FaUserPlus } from "react-icons/fa";

const Table = (props) => {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {props.fieldsTH.map(field => (
                            <th>{field}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, index) => (
                        <tr key={index}>
                            {props.fieldsTD.map((field, i) => (
                                <td key={i}>
                                    {field === "name" ? (
                                        <button className="name-button" onClick={() => props.onNameClick(item)}  >
                                            {formatField(field, item[field])}
                                        </button>
                                    ) : (
                                        formatField(field, item[field])
                                    )}
                                </td>
                            ))}
                            <td>
                                <FaUserPlus onClick={() => props.onAddEmployee()} className="fa-add-employee" />
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
