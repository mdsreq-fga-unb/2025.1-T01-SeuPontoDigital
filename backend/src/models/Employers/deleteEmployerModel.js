import supabase from "../../config/supabase.js";

const deleteEmployerModel = async (id) => {
    try {
        const { error } = await supabase.from("employers").delete().eq("id", id);
        
        if (error) return error;
    }
    catch (err) {
        console.error("error in deleteEmployerModel");
    }
}

export default deleteEmployerModel;