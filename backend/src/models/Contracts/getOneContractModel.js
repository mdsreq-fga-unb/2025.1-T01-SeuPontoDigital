import supabase from "../../config/supabase.js";

const getOneContractModel = async (id) => {
    try{
        const {data, error} = await supabase.from("employee_contracts").select("*").eq("id", id).single();

        if (error) return { error };
            
        return data ;
    }
    catch (err){
        console.error("error in getOneContractModel");
    }
}

export default getOneContractModel;