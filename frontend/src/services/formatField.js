const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

const formatStatus = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const formatSalary = (salary) => {
    return salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`
};

const formatField = (field, value) => {
    if (field === "cpf") return formatCPF(value);
    if (field === "phone") return formatPhone(value);
    if (field === "contract_status") return formatStatus(value);
    if (field === "salary") return formatSalary(value);
    if (field === "contract_start_date") return formatDate(value);
    return value;
};

export default formatField;
