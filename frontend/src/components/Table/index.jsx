import "./Table.css";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import formatField from "../../services/formatField";

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
                                {formatField(field, item[field])}
                              </td>
                            ))}
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

export default Table;
