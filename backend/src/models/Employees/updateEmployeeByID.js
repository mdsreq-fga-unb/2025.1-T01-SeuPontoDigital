import supabase from "../../config/supabase.js";

const updateEmployeeByID = async (employeeID, updateFields) => {
    try{
        const {error} = await supabase.from("employees").update(updateFields).eq("id", employeeID);

        if (error) return error;    
    }
    catch(err){
        console.error("error in updateEmployeeByID models:", err);
        throw err;
    }
}

export default updateEmployeeByID;