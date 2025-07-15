import { useState } from "react";
import axios from "axios";

const useEmployeeTimesheet = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTimesheet = async ({ employeeId, employerId, period }) => {
    if (!employeeId || !employerId || !period) return;

    console.log("employeeId", employeeId)
    console.log("employerId", employerId)
    console.log("period", period)

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/timesheet`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            employeeId,
            employerId,
            period, // formato: "2025-07"
          },
        }
      );

      // console.log(JSON.stringify(response.data, null, 2));
      // console.log("response:", response)
      setData(response.data);
    } catch (err) {
      console.error("Erro ao buscar timesheet:", err);
      alert("Erro ao buscar dados de ponto");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchTimesheet };
};

export default useEmployeeTimesheet;
