import "../pagesStyle.css";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SelectInput from "../../components/SelectInput";
import ButtonGenerateFile from "../../components/ButtonGenerateFile";

const Timesheets = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="container-dashboard">
      <Sidebar />
          <div className="form-time-select">
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
                     <ButtonGenerateFile>Gerar relatório</ButtonGenerateFile>
        </div>
    </div>
  );
};

export default Timesheets;
