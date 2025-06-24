import supabase from "../../config/supabase.js";

const putEmployerModel = async (employeeID, updateFields) => {
    try {
        const { error } = await supabase
            .from("employees")
            .update(updateFields)
            .eq("id", employeeID);

        if (error) return error.message;
    
        return null;
    }
    catch (err) {
        console.error("error in putEmployerModel", err);
    }
}

export default putEmployerModel;