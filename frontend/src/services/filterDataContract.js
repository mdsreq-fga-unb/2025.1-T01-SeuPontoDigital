import formatField from "./formatField.js";

const filterDataContract = (data, searchTerm) => {
    const lowerSearchTerm = (searchTerm ?? "").toLowerCase();

    return data.filter((contract) =>
        (contract.employerName ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.employeeName ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.function ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.salary ?? "").toString().includes(lowerSearchTerm) ||
        (contract.status ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.employer?.name ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (formatField("start_date", contract.start_date) ?? "").includes(lowerSearchTerm)
    );
};

export default filterDataContract;