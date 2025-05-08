import supabase from "../../config/supabase.js";

const fetchContracts = async () => {
    try {
            const { data: employmentData, error: employmentError } = await supabase.from("employment_contract")
                .select(`
                id, function, salary, date_start, 
                employee:id_employee(id, name), 
                employer:id_employer(id, name)
              `);

            const { data: contractData, error: contractError } = await supabase
                .from("contract")
                .select("id, id_user, active");
            
            if (!employmentError && !contractError) {
                const mergedData = employmentData.map(emp => {
                    const contractInfo = contractData.find(c => c.id_user === emp.employer.id);
                    return {
                        ...emp,
                        employer: {
                            ...emp.employer,
                            active: contractInfo.active
                        }
                    };
                });

              return mergedData;
            }

            return { error: { employmentError, contractError} };
            
    }
    catch (err) {
        console.error("error in fetchContracts models:", err);
        throw err;
    }
}

export default fetchContracts;