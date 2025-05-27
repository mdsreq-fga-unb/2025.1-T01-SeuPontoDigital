import "./DaysOfWeekSelector.css";

const daysOfWeek = [
    { value: "segunda", label: "Segunda" },
    { value: "terca", label: "Terça" },
    { value: "quarta", label: "Quarta" },
    { value: "quinta", label: "Quinta" },
    { value: "sexta", label: "Sexta" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
];

const maxDays = 6;

const DaysOfWeekSelector = ({ selectedDays, onChange, workScheduleType }) => {

    const handleCheckboxChange = (day) => {
        const exists = selectedDays.find(d => d.day === day);
        if (exists) {
            onChange(selectedDays.filter(d => d.day !== day));
        } else if (selectedDays.length < maxDays) {
            if (
                workScheduleType === "fixa" &&
                selectedDays.length > 0 &&
                day !== "sabado" &&
                day !== "domingo"
            ) {
                const { start, end } = selectedDays[0];
                onChange([...selectedDays, { day, start, end }]);
            } else {
                onChange([...selectedDays, { day, start: "", end: "" }]);
            }
        }
    };

    const handleTimeChange = (day, field, value) => {
        if (workScheduleType === "fixa") {
            if (day === "sabado" || day === "domingo") {
                onChange(
                    selectedDays.map(d =>
                        d.day === day ? { ...d, [field]: value } : d
                    )
                );
            } else {
                onChange(
                    selectedDays.map(d => {
                        if (d.day === "sabado" || d.day === "domingo") {
                            return d;
                        }
                        return { ...d, [field]: value };
                    })
                );
            }
        } else {
            onChange(
                selectedDays.map(d =>
                    d.day === day ? { ...d, [field]: value } : d
                )
            );
        }
    };

    return (
        <div className="days-of-week-selector">
            <label>Dias de Trabalho</label>
            <div className="days-checkbox-group">
                {daysOfWeek.map(day => {
                    const selected = selectedDays.find(d => d.day === day.value);
                    const isChecked = !!selected;
                    const start = selected?.start || "";
                    const end = selected?.end || "";

                    return (
                        <div key={day.value} className="day-row" onClick={() => handleCheckboxChange(day.value)} style={{ cursor: "pointer" }}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={day.value}
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(day.value)}
                                    disabled={!isChecked && selectedDays.length >= maxDays}
                                    onClick={e => e.stopPropagation()}
                                />
                                {day.label}
                            </label>

                            <span className="time-inputs">
                                Entrada:{" "}
                                <input
                                    type="time"
                                    value={start}
                                    onChange={e => handleTimeChange(day.value, "start", e.target.value)}
                                    disabled={!isChecked}
                                    onClick={e => e.stopPropagation()}
                                />
                                Saída:{" "}
                                <input
                                    type="time"
                                    value={end}
                                    onChange={e => handleTimeChange(day.value, "end", e.target.value)}
                                    disabled={!isChecked}
                                    onClick={e => e.stopPropagation()}
                                />
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DaysOfWeekSelector;
