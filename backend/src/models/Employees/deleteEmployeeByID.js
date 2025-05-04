import supabase from "../../config/supabase.js";

const deleteEmployeeByID = async (id) => {
    try {
        const { error } = await supabase.from("users").delete().eq("id", id).eq("role", 0);
        if (error) return error;
    }
    catch (err) {
        console.error("error in deleteEmployeeByID models:", err);
        throw err;
    }
}

export default deleteEmployeeByID;
