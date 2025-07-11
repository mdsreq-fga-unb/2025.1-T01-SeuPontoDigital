import supabase from "../../config/supabase.js";

const GetOneUserFromCPF = async (cpf) => {
    try {
        // Procurar primeiro como empregador
        const { data: findEmployer } = await supabase
            .from('employers')
            .select('*')
            .eq('cpf', cpf)
            .single();

        // Se não encontrar como empregador, procurar como empregado
        if (!findEmployer) {
            const { data: findEmployee } = await supabase
                .from('employees')
                .select('*')
                .eq('cpf', cpf)
                .single();

            if (!findEmployee) {
                return null;
            }

            return {
                ...findEmployee,
                type: 'employee'
            };
        }

        return {
            ...findEmployer,
            type: 'employer'
        };

    } catch (err) {
        console.error('Error in GetOneUserFromCPF:', err);
        throw err;
    }
};

export default GetOneUserFromCPF;