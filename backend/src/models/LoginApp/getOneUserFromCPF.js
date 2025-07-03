import getOneEmployerFromCPF from "../Employers/getOneEmployerFromCPF.js";
// import getOneEmployeeFromCPF from "../ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployeeFromCPFModel from "../Employees/getOneEmployeeFromCPFModel.js";


const getOneUserFromCPF = async (cpf) => {
    try {
        // userLogger.debug(`Starting user lookup for CPF: ${cpf}`);

        // Tenta buscar o empregador
        const findEmployer = await getOneEmployerFromCPF(cpf);
        // userLogger.debug(`Employer search result:`, { employerData: findEmployer });
        
        const employerData = findEmployer;
        const employerError = findEmployer?.error;

        // Se não encontrar o empregador, tenta buscar o empregado
        if (employerError || !employerData) {
            const findEmployee = await getOneEmployeeFromCPFModel(cpf);
            const employeeData = findEmployee;
            const employeeError = findEmployee?.error;
            
            // Se não encontrar o empregado, retorna um erro
            if (employeeError || !employeeData) {
                // userLogger.error(`User not found as employer or employee for CPF: ${cpf}`, { 
                //     employerError, 
                //     employeeError 
                // });
                return {
                    error: employeeError,
                    userType: null,
                    data: null
                };
            }

            // Se encontrou o empregado, retorna os dados
            // userLogger.info(`Found employee with CPF: ${cpf}`);
            return {
                error: null,
                userType: 'employee',
                data: employeeData
            }
        }

        // Se encontrou o empregador, retorna os dados
        // userLogger.info(`Found employer with CPF: ${cpf}`);
        return {
            error: null,
            userType: 'employer',
            data: employerData
        };
    } catch (err) {
        // userLogger.error(`Error in GetOneUserFromCPF: ${err.message}`, { 
        //     error: err,
        //     cpf: cpf
        // });
        return {
            error: err,
            userType: null,
            data: null
        }
    }
};

export default getOneUserFromCPF;