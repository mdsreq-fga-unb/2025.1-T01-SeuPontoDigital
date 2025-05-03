import supabase from "../../config/supabase.js";

const updateEmployerByID = async (employerID, updateFields) => {
    try {
        const { error } = await supabase.from("users").update(updateFields).eq("id", employerID);

        if (error) return error;
    }
    catch (err) {
        console.error("error in updateEmployerByID models:", err);
        throw err;
    }
}

export default updateEmployerByID;