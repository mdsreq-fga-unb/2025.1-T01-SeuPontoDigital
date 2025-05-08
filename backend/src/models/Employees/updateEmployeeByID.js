import supabase from "../../config/supabase.js";

const updateEmployeeByID = async (employeeID, updateFields) => {
    try {
        const { error } = await supabase.from("users").update(updateFields).eq("id", employeeID).eq("role", 0);

        if (error) return error;
    }
    catch (err) {
        console.error("error in updateEmployeeByID models");
    }
}

export default updateEmployeeByID;