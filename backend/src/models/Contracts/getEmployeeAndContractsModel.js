import supabase from "../../config/supabase.js";

const getEmployeeAndContractsModel = async (employeeId) => {
    try {
        const { data: employeeData, error: employeeError } = await supabase
            .from('employees')
            .select('id, name, phone, cpf')
            .eq('id', employeeId)
            .single();

        if (employeeError) {
            console.error('Erro ao buscar funcionário por ID:', employeeError.message);
            return { error: employeeError.message };
        }
        if (!employeeData) {
            return { data: null, message: "Funcionário não encontrado." };
        }

        const { data: contractsData, error: contractsError } = await supabase
            .from('sign_contract')
            .select(`
                id_contract,
                id_employer,
                contracts ( *, address(cep, street, uf, neighborhood, city, house_number, complement, latitude, longitude) ),
                employers ( id, name, cpf, phone, email, id_address(cep, street, uf, neighborhood, city, house_number, complement, latitude, longitude) )
            `)
            .eq('id_employee', employeeId);

        if (contractsError) {
            console.error('Erro ao buscar contratos do funcionário:', contractsError.message);
            return { error: contractsError.message };
        }

        const result = {
            employee: employeeData,
            contracts: contractsData.map(sc => ({
                id_contract: sc.id_contract,
                id_employer: sc.id_employer,
                contractDetails: sc.contracts,
                employerDetails: sc.employers
            }))
        };

        return { data: result };

    } catch (err) {
        console.error("Erro inesperado em getEmployeeAndContractsModel:", err.message);
        return { error: "Erro interno do servidor ao buscar dados do funcionário e contratos." };
    }
};

export default getEmployeeAndContractsModel;