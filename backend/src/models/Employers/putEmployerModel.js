import supabase from "../../config/supabase.js";

const putEmployerModel = async (employerID, updateFields) => {
    try {
        const { error } = await supabase.from("employers").update(updateFields).eq("id", employerID);

        if (error) return error;
    }
    catch (err) {
        console.error("error in putEmployerModel");
    }
}

export default putEmployerModel;