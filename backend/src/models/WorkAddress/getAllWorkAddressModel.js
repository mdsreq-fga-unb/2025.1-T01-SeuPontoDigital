import supabase from "../../config/supabase.js";

const getAllWorkAddressModel = async () => {

    try{
        const {data, error} = await supabase.from("work_address").select("*");
        
        if (error) return;
        
        return data;
    }
    catch(err){
        console.error("error in getWorkAddressModel");
    }
}

export default getAllWorkAddressModel;