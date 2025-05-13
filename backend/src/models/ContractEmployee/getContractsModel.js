import supabase from "../../config/supabase.js";

const getContractsModel = async () => {
    try{
        const {data, error} = await supabase.from("employee_contracts").select("*");
        if (error) {
            console.error(error);
            return { error };
        }
        return data ;
    }
    catch (err){
        console.error("error in getContractsModel:");
        throw err;
    }


}

export default getContractsModel;