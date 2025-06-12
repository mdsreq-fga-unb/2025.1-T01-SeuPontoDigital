import supabase from "../../config/supabase.js";

const putContractModel = async (id, updateFields) => {
    try {
        const { error } = await supabase.from("employee_contracts").update(updateFields).eq("id", id);

        if (error) return error;
    }
    catch (err) {
        console.error("error in putContractModel");
    }
}

export default putContractModel;