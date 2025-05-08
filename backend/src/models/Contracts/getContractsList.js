import supabase from "../../config/supabase.js";

const fetchContracts = async () => {
    try {
        const { data, error } = await supabase.from("employment_contract")
            .select(`
            id, active, function, salary, date_start, 
            employee:id_employee(id, name), 
            employer:id_employer(id, name)
          `);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("error in fetchContracts models:", err);
        throw err;
    }
}

export default fetchContracts;