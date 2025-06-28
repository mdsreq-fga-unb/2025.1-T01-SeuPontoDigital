import getOneEmployerFromCPF from "../Employers/getOneEmployerFromCPF.js";
// import getOneEmployeeFromCPF from "../ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployeeFromCPFModel from "../Employees/getOneEmployeeFromCPFModel.js";

const getOneUserFromCPF = async (cpf) => {
    try {

        // Tenta buscar o empregador
        const findEmployer = await getOneEmployerFromCPF(cpf);
        const employerData = findEmployer;
        const employerError = findEmployer?.error;

        // Se não encontrar o empregador, tenta buscar o empregado
        if (employerError || !employerData) {
            const findEmployee = await getOneEmployeeFromCPFModel(cpf);
            const employeeData = findEmployee;
            const employeeError = findEmployee?.error;
            
            // Se não encontrar o empregado, retorna um erro
            if (employeeError || !employeeData) {
                console.error("Usuário não encontrado como empregador ou empregado.");
                return{
                    error: employeeError,
                    userType: null,
                    data: null
                };
            }

            // Se encontrou o empregado, retorna os dados
            return {
                error: null,
                userType: 'employee',
                data: employeeData
            }
        }

        // Se encontrou o empregador, retorna os dados
        return {
                error: null,
                userType: 'employer',
                data: employerData
        };

    } catch (err) {
        console.error("Error in GetOneUserFromCPF ", err);
        return {
            error: err,
            userType: null,
            data: null
        }
    }
};

export default getOneUserFromCPF;