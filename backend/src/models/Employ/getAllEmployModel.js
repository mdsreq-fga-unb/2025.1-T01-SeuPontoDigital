import supabase from "../../config/supabase.js";

const getAllEmployModel = async() =>{

    try{
        const {data, error} = await supabase.from("employ").select("*");

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getEmployModel");
    }

}

export default getAllEmployModel;