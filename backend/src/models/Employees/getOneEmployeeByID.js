import supabase from "../../config/supabase.js";

const getOneEmployeeByID = async (id) => {
    try{
        const {data, error} = await supabase.from("employees").select("*").eq("id", id).single();
        if (error){
            console.error(error);
            return null;
        }
        return data;
    }
    catch(err){
        console.error("error in getOneEmployeeByID models");
    }
}

export default getOneEmployeeByID;