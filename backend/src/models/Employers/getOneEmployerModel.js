import supabase from "../../config/supabase.js";

const getOneEmployerModel = async (id) => {
    try{
        const {data, error} = await supabase.from("employers").select("*").eq("id", id).single();

        if (error) throw new Error("failed to fetch employer");

        return data;
    }
    catch(err){
        console.error("error in getOneEmployerModel");
    }
}

export default getOneEmployerModel;