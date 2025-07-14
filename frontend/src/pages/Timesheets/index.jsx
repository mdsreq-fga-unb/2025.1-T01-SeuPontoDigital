import "../pagesStyle.css";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SelectInput from "../../components/SelectInput";
import ButtonGenerateFile from "../../components/ButtonGenerateFile";
import useEmployeeOptions from "../../hooks/useEmployeeOptions";
import useEmployerOptions from "../../hooks/useEmployerOptions";
import useEmployeeTimesheet from "../../hooks/useEmployeeTimesheet";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const Timesheets = () => {
  const { data, loading, fetchTimesheet } = useEmployeeTimesheet();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const { options: employeeOptions, loading: loadingEmployees } = useEmployeeOptions();
  const { options: employerOptions, loading: loadingEmployers } = useEmployerOptions(selectedEmployee);
  const [employerName, setEmployerName] = useState("");
  //const navigate = useNavigate();  provavelmente será usado na geração do pdf
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [selectPeriod, setSelectPeriod] = useState("");

  useEffect(() => {
    if (selectYear < currentYear) {
      setSelectPeriod('Jan-Fev');
    } else if (selectYear === currentYear) {
      const current = getCurrentPeriod();
      setSelectPeriod(current);
    } else {
      setSelectPeriod('');
    }
  }, [selectYear]);

  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  const year_period_time = [];
  for (let year = currentYear; year >= startYear; year--) {
    year_period_time.push({ value: year, label: year.toString() });
  }

  const generatePeriods = () => {
    return [
      { label: 'Jan-Fev', value: 'Jan-Fev', startMonth: 1 },
      { label: 'Fev-Mar', value: 'Fev-Mar', startMonth: 2 },
      { label: 'Mar-Abr', value: 'Mar-Abr', startMonth: 3 },
      { label: 'Abr-Mai', value: 'Abr-Mai', startMonth: 4 },
      { label: 'Mai-Jun', value: 'Mai-Jun', startMonth: 5 },
      { label: 'Jun-Jul', value: 'Jun-Jul', startMonth: 6 },
      { label: 'Jul-Ago', value: 'Jul-Ago', startMonth: 7 },
      { label: 'Ago-Set', value: 'Ago-Set', startMonth: 8 },
      { label: 'Set-Out', value: 'Set-Out', startMonth: 9 },
      { label: 'Out-Nov', value: 'Out-Nov', startMonth: 10 },
      { label: 'Nov-Dez', value: 'Nov-Dez', startMonth: 11 },
      { label: 'Dez-Jan', value: 'Dez-Jan', startMonth: 12 },
    ];
  };

  const getMonthFromPeriod = (periodLabel) => {
    const mapa = {
      "Jan-Fev": "01",
      "Fev-Mar": "02",
      "Mar-Abr": "03",
      "Abr-Mai": "04",
      "Mai-Jun": "05",
      "Jun-Jul": "06",
      "Jul-Ago": "07",
      "Ago-Set": "08",
      "Set-Out": "09",
      "Out-Nov": "10",
      "Nov-Dez": "11",
      "Dez-Jan": "12",
    };
    return mapa[periodLabel] || "01";
  };

  const getCurrentPeriod = () => {
    const periods = getFilteredPeriods(new Date().getFullYear());
    return periods.length > 0 ? periods[periods.length - 1].value : '';
  };

  const getFilteredPeriods = (year) => {
    const today = new Date();
    const periods = generatePeriods();

    return periods.filter(({ startMonth }) => {
      const startDate = new Date(year, startMonth - 1, 25);
      const endMonth = startMonth === 12 ? 1 : startMonth + 1;
      const endYear = startMonth === 12 ? year + 1 : year;
      const endDate = new Date(endYear, endMonth - 1, 24);
      return today > endDate;
    });
  };

  const monthly_period_time = getFilteredPeriods(selectYear);

  const calcularIntervalo = (ida, volta) => {
    if (!ida || !volta) return "-";

    const [h1, m1, s1] = ida.split(":").map(Number);
    const [h2, m2, s2] = volta.split(":").map(Number);

    const segundos1 = h1 * 3600 + m1 * 60 + s1;
    const segundos2 = h2 * 3600 + m2 * 60 + s2;

    const diff = segundos2 - segundos1;
    if (diff <= 0) return "-";

    const hh = String(Math.floor(diff / 3600)).padStart(2, "0");
    const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const ss = String(diff % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };

  const handleGeneratePDF = async () => {
    const periodString = `${selectYear}-${getMonthFromPeriod(selectPeriod)}`;

    await fetchTimesheet({
      employeeId: selectedEmployee,
      employerId: selectedEmployer,
      period: periodString,
    });

    if (!data || data.length === 0) {
      alert("Nenhum dado encontrado para gerar o relatório.");
      return;
    }

    const doc = new jsPDF();

    const registros = data[0].registros?.[periodString] || [];

    const linhas = [];
    let total50 = "0.00";
    let total100 = "0.00";

    for (const r of registros) {
      if (r.tipo === "resumo_horas_extras") {
        total50 = r.total_50;
        total100 = r.total_100;
        continue;
      }

      const intervalo = calcularIntervalo(r.ida_almoco, r.volta_almoco);

      linhas.push([
        r.data,
        r.dia_semana,
        r.entrada || "-",
        r.ida_almoco || "-",
        r.volta_almoco || "-",
        r.saida || "-",
        intervalo,
        r.carga_horaria_dia || "-",
        r.horas_trabalhadas || "-",
        r.horas_extra || "-",
      ]);
    }

    // Cabeçalho do relatório com nome da pessoa e função
    const empregado = data[0].empregado;
    doc.text(`Relatório de Horas - ${empregado.nome}`, 20, 20);
    doc.text(`Função: ${empregado.function}`, 20, 30);
    doc.text(`Período: ${selectPeriod} / ${selectYear}`, 20, 40);
    doc.text(`Empregador: ${employerName}`, 20, 35);

    autoTable(doc, {
      startY: 50,
      head: [[
        "Data",
        "Dia",
        "Entrada",
        "Almoço Ida",
        "Almoço Volta",
        "Saída",
        "Duração Intervalo",
        "Carga Horária",
        "Horas Trabalhadas",
        "Horas Extra"
      ]],
      body: linhas,
    });

    // Rodapé com totais
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [
        [
          { content: "Total 50%:", colSpan: 4 },
          total50,
          { content: "Total 100%:", colSpan: 3 },
          total100
        ]
      ],
      theme: "grid",
      styles: { halign: "right", fontStyle: "bold" },
    });

    doc.save(`relatorio-${empregado.nome}-${periodString}.pdf`);
  };


  return (
    <div className="container-dashboard">
      <Sidebar />
          <div className="form-time-select">
            <div className="section-time-select">
              <div className="div-employee-select">
                <label>Empregado</label>
                <select
                  name="employee_to_sheets"
                  value={selectedEmployee}
                  onChange={(e) => {
                    console.log("Selecionou empregado:", e.target.value);
                    setSelectedEmployee(e.target.value);
                    setSelectedEmployer(""); // limpa empregador ao trocar empregado
                  }}
                >
                  <option value="">Selecione...</option>
                  {employeeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="div-employ-select">
                <label>Empregador</label>
                <select
                  name="employer_to_sheets"
                  value={selectedEmployer}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedEmployer(e.target.value)

                    const label = employerOptions.find((opt) => opt.value === value)?.label || "";
                    setEmployerName(label); // salva o nome do empregador
                  }}
                >
                  <option value="">Selecione...</option>
                  {employerOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="section-time-select">
              <SelectInput
                className="div-time-select"
                label="Ano"
                name="year_period_time"
                value={selectYear}
                onChange={(e) => setSelectYear(Number(e.target.value))}
                options={year_period_time}
              />
              <SelectInput
                className="div-time-select"
                label="Período"
                name="monthly_period_time"
                value={selectPeriod}
                onChange={(e) => setSelectPeriod(e.target.value)}
                options={monthly_period_time}
              />
            </div>
                     <ButtonGenerateFile onClick={handleGeneratePDF}>Gerar relatório</ButtonGenerateFile>
        </div>
    </div>
  );
};

export default Timesheets;
