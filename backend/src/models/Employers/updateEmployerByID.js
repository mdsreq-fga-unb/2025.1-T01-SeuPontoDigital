import supabase from "../../config/supabase.js";

const updateEmployerByID = async (employerID, updateFields) => {
    try {
        const { error } = await supabase.from("users").update(updateFields).eq("id", employerID).eq("role", 1);

        if (error) return error;
    }
    catch (err) {
        console.error("error in updateEmployerByID models");
    }
}

export default updateEmployerByID;