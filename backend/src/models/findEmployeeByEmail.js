import supabase from "../config/supabase.js";

const findEmployeeByEmail = async (email) => {
    try {
        const { data, error } = await supabase.from("employee_contracts").select("*").eq("email", email).single();
        if (error) {
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("error in findEmployeeByEmail models");
    }
}

export default findEmployeeByEmail;