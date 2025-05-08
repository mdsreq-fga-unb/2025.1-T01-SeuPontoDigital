import supabase from "../../config/supabase.js";

const getOneEmployerByID = async (id) => {
    try{
        const {data, error} = await supabase.from("users").select("*").eq("id", id).eq("role", 1).single();
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