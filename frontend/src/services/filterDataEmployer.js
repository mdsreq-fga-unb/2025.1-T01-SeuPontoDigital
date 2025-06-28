const filterDataEmployer = (data, searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter((employer) =>
        employer.name.toLowerCase().includes(lowerSearchTerm) ||
        employer.cpf.toLowerCase().includes(lowerSearchTerm) ||
        employer.phone.toLowerCase().includes(lowerSearchTerm) ||
        employer.email.toLowerCase().includes(lowerSearchTerm)
    );
};

export default filterDataEmployer;