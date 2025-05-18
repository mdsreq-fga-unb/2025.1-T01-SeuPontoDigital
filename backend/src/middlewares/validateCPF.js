const validateCPF = (cpf) => {

    cpf = cpf.replace(/-|\./g, "");

    if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let expectedCPF = cpf.split("").slice(0, 9);

    for (let i = 9; i < 11; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += Number(expectedCPF[j]) * (i + 1 - j);
        }
        if (sum % 11 < 2) {
            expectedCPF.push(0);
        }
        else {
            expectedCPF.push(11 - (sum % 11));
        }
    }
    expectedCPF = expectedCPF.join("");
    if (cpf === expectedCPF)
        return true;
    return false;
}

export default validateCPF;