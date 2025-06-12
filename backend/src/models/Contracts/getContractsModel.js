import supabase from "../../config/supabase.js";

const getContractsModel = async () => {
    try{
        const {data, error} = await supabase.from("contracts").select("*");

        if (error)  return;
           
        return data ;
    }
    catch (err){
        console.error("error in getContractsModel");
    }
}

export default getContractsModel;