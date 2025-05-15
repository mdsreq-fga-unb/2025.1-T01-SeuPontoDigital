import "./TableContracts.css";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import formatField from "../../services/formatField";

const TableContracts = (props) => {
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
                    {props.data.map((item) => (
                        <tr key={item.id}>
                            {props.fieldsTD.map((field, i) => {
                                const fieldParts = field.split(".");
                                const value = fieldParts.length > 1 ? item[fieldParts[0]][fieldParts[1]] : item[field];

                                return <td key={i}>{formatField(field, value)}</td>;
                            })}
                            <td>
                                <FaPenToSquare onClick={() => props.onEdit(item)} className="fa-edit" />
                                <FaTrashCan onClick={() => props.onDelete(item)} className="fa-delete" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableContracts;
