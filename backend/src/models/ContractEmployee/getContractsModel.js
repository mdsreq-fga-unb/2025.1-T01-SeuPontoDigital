import supabase from "../../config/supabase.js";

const getContractsModel = async () => {
    try{
        const {data, error} = await supabase.from("employee_contracts").select("*, employer: employer_id(id, name)");

        if (error)  return { error };
           
        return data ;
    }
    catch (err){
        console.error("error in getContractsModel");
    }
}

export default getContractsModel;