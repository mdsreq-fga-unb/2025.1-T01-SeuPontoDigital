import supabase from "../../config/supabase.js";

const getOneEmployerWithContractsModel = async (id) => {
    try {
        const { data: employer, error: employerError } = await supabase
            .from("employers")
            .select(`
                id,
                name,
                cpf,
                phone,
                email,
                address:id_address (
                    cep,
                    street,
                    uf,
                    neighborhood,
                    city,
                    house_number,
                    complement
                )
            `)
            .eq("id", id)
            .single();

        if (employerError || !employer) throw new Error("failed to fetch employer");

        const { data: contracts, error: contractsError } = await supabase
            .from("employee_contracts")
            .select("*")
            .eq("employer_id", id);

        if (contractsError) throw new Error("failed to fetch contracts");

        const activeEmployees = contracts.filter(c => c.contract_status === "ativo");
        const inactiveEmployees = contracts.filter(c => c.contract_status === "inativo");

        // Flatten address data
        const flattenedEmployer = {
            ...employer,
            ...(employer.address || {}),
        };
        delete flattenedEmployer.address;

        return { ...flattenedEmployer, activeEmployees, inactiveEmployees }
    } 
    catch (err) {
        console.error("error in getOneEmployerWithContractsModel");
        return null;
    }
}

export default getOneEmployerWithContractsModel;