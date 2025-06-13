const filterDataContract = (data, searchTerm) => {
    const lowerSearchTerm = (searchTerm ?? "").toLowerCase();

    return data.filter((contract) =>
        (contract.name ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.job_function ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.salary ?? "").toString().includes(lowerSearchTerm) ||
        (contract.contract_status ?? "").toLowerCase().includes(lowerSearchTerm) ||
        (contract.employer?.name ?? "").toLowerCase().includes(lowerSearchTerm)
    );
};

export default filterDataContract;