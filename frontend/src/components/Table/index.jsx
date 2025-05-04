import "./Table.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Table = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(props.path, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error("error:", err);
            });
    }, []);

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {props.fieldsTH.map(field => (
                            <th>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {props.fieldsTD.map((field, i) => (
                                <td key={i}>{item[field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
