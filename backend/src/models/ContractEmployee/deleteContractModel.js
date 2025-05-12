import supabase from "../../config/supabase.js";

const deleteContractModel = async (id) => {
    try{
        const {error} = await supabase.from("employee_contracts").delete().eq("id", id);
        if(error) return error;
    }
    catch(err){
        console.error("error in deleteContractModel: ", err);
    }
}

export default deleteContractModel;