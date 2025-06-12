import supabase from "../../config/supabase.js";

const getAllSignContractModel = async() => {

    try{
        const {data, error} = await supabase.from("sign_contract").select("*");

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getAllSignContractModel");
    }
}

export default getAllSignContractModel;