import { useEffect, useState } from "react";
import axios from "axios";

const useEmployerOptions = (employeeId) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!employeeId) {
      setOptions([]);
      return;
    }

    const fetchEmployers = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        // Passo 1: Buscar todos os vínculos
        const employResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employ`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const employData = employResponse.data; // [{ employeeId, employerId }]
        // console.log("Todos os vínculos:", employData);

        // Passo 2: Filtrar pelos employerId do empregado atual
        const employerIds = employData
          .filter((entry) => entry.id_employee=== employeeId)
          .map((entry) => entry.id_employer);

        // console.log("Empregadores vinculados:", employerIds);

        // Passo 3: Buscar detalhes de cada employerId
        const detailedEmployers = await Promise.all(
          employerIds.map(async (id) => {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/employer/${id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return response.data;
          })
        );

        // console.log("Empregadores detalhados:", detailedEmployers);

        // Passo 4: Mapear para o formato do select
        const formatted = detailedEmployers.map((emp) => ({
          label: emp.name,
          value: emp.id,
        }));

        setOptions(formatted);
      } catch (err) {
        console.error("Erro ao buscar empregadores:", err);
        const message =
          err.response?.data?.message ||
          err.response?.data?.errors ||
          "Erro inesperado";
        alert(message);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, [employeeId]);

  return { options, loading };
};

export default useEmployerOptions;
