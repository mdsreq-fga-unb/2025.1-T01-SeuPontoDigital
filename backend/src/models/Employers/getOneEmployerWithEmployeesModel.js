import supabase from "../../config/supabase.js";

const getOneEmployerWithEmployeesModel = async (id) => {
    try {
        // Buscar dados básicos do empregador
        const { data: employer, error: employerError } = await supabase
            .from("employers")
            .select(`
                id,
                name,
                cpf,
                email,
                phone,
                id_address,
                created_at,
                address:id_address (
                    id,
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

        if (employerError) throw new Error("failed to fetch employer");

        // Buscar contratos relacionados ao empregador através da tabela sign_contract
        const { data: contracts, error: contractsError } = await supabase
            .from("sign_contract")
            .select(`
                id_contract,
                id_employee,
                employee:id_employee (
                    id,
                    name,
                    cpf,
                    phone,
                    created_at
                ),
                contract:id_contract (
                    id,
                    function,
                    salary,
                    status,
                    access_app,
                    start_date,
                    end_date
                )
            `)
            .eq("id_employer", id);

        if (contractsError) {
            console.error("Error fetching contracts:", contractsError);
            // Continue sem contratos se houver erro
        }

        // Processar contratos para separar ativos/inativos
        const activeEmployees = [];
        const inactiveEmployees = [];

        if (contracts && contracts.length > 0) {
            contracts.forEach(signContract => {
                const employee = signContract.employee;
                const contract = signContract.contract;
                
                if (employee && contract) {
                    const employeeData = {
                        id: employee.id,
                        name: employee.name,
                        cpf: employee.cpf,
                        phone: employee.phone,
                        job_function: contract.function,
                        contract_start_date: contract.start_date,
                        contract_end_date: contract.end_date,
                        app_access_status: contract.access_app ? "Ativo" : "Inativo",
                        salary: contract.salary
                    };

                    if (contract.status) {
                        activeEmployees.push(employeeData);
                    } else {
                        inactiveEmployees.push(employeeData);
                    }
                }
            });
        }

        // Flatten the address data into the employer object
        let flattenedEmployer = { ...employer };
        if (employer && employer.address) {
            flattenedEmployer = {
                ...employer,
                cep: employer.address.cep,
                street: employer.address.street,
                uf: employer.address.uf,
                neighborhood: employer.address.neighborhood,
                city: employer.address.city,
                house_number: employer.address.house_number,
                complement: employer.address.complement,
            };
            delete flattenedEmployer.address;
        }

        // Adicionar listas de empregados
        flattenedEmployer.activeEmployees = activeEmployees;
        flattenedEmployer.inactiveEmployees = inactiveEmployees;

        return flattenedEmployer;
    }
    catch(err){
        console.error("error in getOneEmployerWithEmployeesModel", err);
        return null;
    }
}

export default getOneEmployerWithEmployeesModel;
