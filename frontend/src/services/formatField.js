const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

const formatStatus = (str) => {
    if (!str || typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatSalary = (salary) => {
    if (typeof salary !== "number" || isNaN(salary)) return "";
    return salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const formatDate = (date) => {
    if (!date || typeof date !== "string" || !date.includes("-")) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

const formatFunction = (job_function) => {
    return job_function.replace(job_function[0], job_function[0].toUpperCase());
}

const formatField = (field, value) => {
    if (field === "cpf") return formatCPF(value);
    if (field === "phone") return formatPhone(value);
    if (field === "contract_status") return formatStatus(value);
    if (field === "salary") return formatSalary(value);
    if (field === "start_date") return formatDate(value);
    if (field === "function") return formatFunction(value);
    return value;
};

export default formatField;
