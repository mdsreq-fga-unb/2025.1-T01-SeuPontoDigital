import { useState } from "react";
import axios from "axios";

const useEmployeeTimesheet = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTimesheet = async ({ employeeId, employerId, period }) => {
    if (!employeeId || !employerId || !period) return;

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
