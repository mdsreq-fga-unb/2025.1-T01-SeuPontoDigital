import supabase from "../../config/supabase.js";

const deleteEmployerModel = async (id) => {
    try {
        const { error } = await supabase.from("employers").delete().eq("id", id);
        
        if (error) return error;
        
        return null; // Success
    }
    catch (err) {
        console.error("error in deleteEmployerModel:", err);
        return err;
    }
}

export default deleteEmployerModel;