import supabase from "../../config/supabase.js";
import getOneEmployerFromCPF from "../Employers/getOneEmployerFromCPF.js";
import getOneEmployeeFromCPF from "../ContractEmployee/getOneEmployeeFromCPF.js";

const getOneUserFromCPF = async (cpf) => {
    try {
        // Tenta buscar o empregador
        const { data: employerData, error: employerError } = await getOneEmployerFromCPF(cpf);

        // Se não encontrar o empregador, tenta buscar o empregado
        if (employerError || !employerData) {
            const { data: employeeData, error: employeeError } = await getOneEmployeeFromCPF(cpf);

            if (employeeError || !employeeData) {
                // Se não encontrar o empregado, retorna um erro
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


// export const getUserByCPF = async (cpf) => {
//   // Por enquanto, retorna um mock:
//   return { data: { id: 1, cpf, password: '$2b$10$fakehash', phone: '61999999999' }, error: null };
// };

// // Depois você trocar por:
// // import { supabase } from '../config/supabase';
// // const { data, error } = await supabase.from('users').select().eq('cpf', cpf).single();
