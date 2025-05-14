import supabase from "../../config/supabase.js";

const fetchEmployees = async () => {
    try {
        const { data, error } = await supabase.from("users").select("*").eq("role", 0);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("error in fetchEmployees models");
    }
}

export default fetchEmployees;