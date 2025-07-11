import supabase from "../../config/supabase.js";

const putEmployeeModel = async (employeeID, updateFields) => {
    try {
        const { error } = await supabase
            .from("employees")
            .update(updateFields)
            .eq("id", employeeID);

        if (error) {
            console.error("Error in putEmployeeModel:", error);
            return error.message;
        }
    
        return null;
    }
    catch (err) {
        console.error("Exception in putEmployeeModel:", err);
        return err.message;
    }
}

export default putEmployeeModel;