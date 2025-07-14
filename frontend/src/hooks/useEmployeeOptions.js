import { useEffect, useState } from "react";
import axios from "axios";

const useEmployeeOptions = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employees`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const formatted = response.data.map((emp) => ({
          label: emp.name,   // ou outro campo desejado
          value: emp.id
        }));

        setOptions(formatted);
      } catch (err) {
        console.error("Erro ao buscar empregados:", err);
        const message = err.response?.data?.message || err.response?.data?.errors || "Erro inesperado";
        alert(message); // ou handleError(message);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { options, loading };
};

export default useEmployeeOptions;
