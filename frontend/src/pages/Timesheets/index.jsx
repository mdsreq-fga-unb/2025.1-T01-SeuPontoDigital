import "../pagesStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ConfirmModal from "../../components/ConfirmModal";
import Table from "../../components/Table";
import SelectInput from "../../components/SelectInput";

const Timesheets = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [selectPeriod, setSelectPeriod] = useState("");
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  const year_period_time = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }
  ).reverse();

  const generatePeriods = () => {
    return [...Array(12).keys()].map(i => {
      const startMonth = i + 1;
      const endMonth = (i + 1) % 12 + 1;

      const startStr = `25/${startMonth.toString().padStart(2, "0")}`;
      const endStr = `24/${endMonth.toString().padStart(2, "0")}`;

      return {
        value: `${startStr} - ${endStr}`,
        label: `${startStr} - ${endStr}`,
        month: startMonth,
      };
    });
  };

  const getFilteredPeriods = (year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const allPeriods = generatePeriods();

    if (year < currentYear) {
      return allPeriods;
    }

    if (year === currentYear) {
      return allPeriods.filter((i) => {
        return (
          i.month < currentMonth ||
          (i.month === currentMonth && currentDay >= 25)
        );
      });
    }

    return [];
  };

  const monthly_period_time = getFilteredPeriods(selectYear);

  return (
    <div className="container-dashboard">
      <Sidebar />
      <div className="container-table-pages">
        <div className="container-select-button">
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
      </div>
    </div>
  );
};

export default Timesheets;
