import supabase from "../../config/supabase.js";

const getEmployeeAndContractsModel = async (employeeId) => {
    try {
        // Busca dados do funcionário
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

        // Busca os contratos assinados com detalhes do contrato, do empregador e do endereço do empregador
        const { data: contractsData, error: contractsError } = await supabase
            .from('sign_contract')
            .select(`
                id_contract,
                id_employer,
                contracts (
                    id,
                    start_date,
                    end_date,
                    status,
                    access_app,
                    salary,
                    function
                ),
                employers (
                    id,
                    name,
                    cpf,
                    phone,
                    email,
                    address:address!employers_id_address_fkey (
                        cep,
                        street,
                        uf,
                        neighborhood,
                        city,
                        house_number,
                        complement
                    )
                )
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
                employerDetails: {
                    ...sc.employers,
                    address: sc.employers.address
                }
            }))
        };

        return { data: result };

    } catch (err) {
        console.error("Erro inesperado em getEmployeeAndContractsModel:", err.message);
        return { error: "Erro interno do servidor ao buscar dados do funcionário e contratos." };
    }
};

export default getEmployeeAndContractsModel;
