import supabase from "../../config/supabase.js";

const getOneEmployerWithContractsModel = async (id) => {
    try {
        // Busca dados do empregador
        const { data: employer, error: employerError } = await supabase
            .from("employers")
            .select("*")
            .eq("id", id)
            .single();

        if (employerError || !employer) throw new Error("failed to fetch employer");

        // Busca contratos desse empregador
        const { data: contracts, error: contractsError } = await supabase
            .from("employee_contracts")
            .select("*")
            .eq("employer_id", id);

        if (contractsError) throw new Error("failed to fetch contracts");

        // Separa ativos e inativos
        const activeEmployees = contracts.filter(c => c.contract_status === "ativo");
        const inactiveEmployees = contracts.filter(c => c.contract_status === "inativo");

        return { ...employer, activeEmployees, inactiveEmployees };
    } catch (err) {
        console.error("error in getOneEmployerWithContractsModel", err);
        return null;
    }
};

export default getOneEmployerWithContractsModel;