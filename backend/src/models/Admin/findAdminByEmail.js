import supabase from "../../config/supabase.js";

const findAdminByEmail = async (email) => {
    try {
        const { data, error } = await supabase.from("admins").select("*").eq("email", email).single();
        if (error) {
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("error in findAdminByEmail models");
    }
}

export default findAdminByEmail;