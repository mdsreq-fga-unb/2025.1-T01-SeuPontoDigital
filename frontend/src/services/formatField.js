const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

const formatField = (field, value) => {
    if (field === "cpf") return formatCPF(value);
    if (field === "phone") return formatPhone(value);
    return value;
};

export default formatField;