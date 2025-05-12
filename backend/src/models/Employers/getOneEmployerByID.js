import supabase from "../../config/supabase.js";

const getOneEmployerByID = async (id) => {
    try{
        const {data, error} = await supabase.from("employers").select("*").eq("id", id).single();
        if (error){
            console.error(error);
            return null;
        }
        return data;
    }
    catch(err){
        console.error("error in getOneEmployerByID models");
    }
}

export default getOneEmployerByID;