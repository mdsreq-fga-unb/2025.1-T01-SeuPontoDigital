const filterDataContract = (data, searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter((contract) =>
        contract.name.toLowerCase().includes(lowerSearchTerm) ||
        contract.job_function.toLowerCase().includes(lowerSearchTerm) ||
        contract.salary.toLowerCase().includes(lowerSearchTerm)
    );
};

export default filterDataContract;