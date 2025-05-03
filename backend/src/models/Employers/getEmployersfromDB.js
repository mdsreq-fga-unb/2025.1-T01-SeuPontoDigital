import supabase from "../../config/supabase.js";

const getEmployersFromDB = async () => {
    try {
        const { data, error } = await supabase.from("users").select("*").eq("role", 1)

        if (error) {
            console.error(error);
            return { error };
        }
        return { data };
    }
    catch (err) {
        console.log("error in getEmployersFromDB models:", err);
        throw err;
    }
}

export default getEmployersFromDB;