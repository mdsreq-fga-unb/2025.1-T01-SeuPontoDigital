import getOneEmployerFromCPF from "../Employers/getOneEmployerFromCPF.js";
import getOneEmployeeFromCPF from "../Contracts/getOneEmployeeFromCPF.js";
import logger from "../../config/logger.js";

const userLogger = logger.child({
    module: "LoginApp"
});

const getOneUserFromCPF = async (cpf) => {
    try {
        userLogger.debug(`Starting user lookup for CPF: ${cpf}`);

        // Tenta buscar o empregador
        const findEmployer = await getOneEmployerFromCPF(cpf);
        userLogger.debug(`Employer search result:`, { employerData: findEmployer });
        
        const employerData = findEmployer;
        const employerError = findEmployer?.error;

        // Se não encontrar o empregador, tenta buscar o empregado
        if (employerError || !employerData) {
            userLogger.debug(`No employer found with CPF ${cpf}, searching for employee`);
            
            const findEmployee = await getOneEmployeeFromCPF(cpf);
            userLogger.debug(`Employee search result:`, { employeeData: findEmployee });
            
            const employeeData = findEmployee;
            const employeeError = findEmployee?.error;
            
            // Se não encontrar o empregado, retorna um erro
            if (employeeError || !employeeData) {
                userLogger.error(`User not found as employer or employee for CPF: ${cpf}`, { 
                    employerError, 
                    employeeError 
                });
                return {
                    error: employeeError,
                    userType: null,
                    data: null
                };
            }

            // Se encontrou o empregado, retorna os dados
            userLogger.info(`Found employee with CPF: ${cpf}`);
            return {
                error: null,
                userType: 'employee',
                data: employeeData
            }
        }

        // Se encontrou o empregador, retorna os dados
        userLogger.info(`Found employer with CPF: ${cpf}`);
        return {
            error: null,
            userType: 'employer',
            data: employerData
        };
    } catch (err) {
        userLogger.error(`Error in GetOneUserFromCPF: ${err.message}`, { 
            error: err,
            cpf: cpf
        });
        return {
            error: err,
            userType: null,
            data: null
        }
    }
};

export default getOneUserFromCPF;