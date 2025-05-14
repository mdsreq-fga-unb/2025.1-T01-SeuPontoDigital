import supabase from "../../config/supabase.js";

const deleteEmployerByID = async (id) => {
    try {
        const { error } = await supabase.from("users").delete().eq("id", id).eq("role", 1);
        if (error) return error;
    }
    catch (err) {
        console.error("error in deleteEmployerByID models");
    }
}

export default deleteEmployerByID;