import supabase from "../config/supabase.js";

const fetchEmployees = async () => {
    try{
        const {data, error} = await supabase.from("employees").select("*");
        if (error){
            console.error(error);
            return null;
        }
        return data;
    }
    catch(err){
        console.error("error in fetchEmployees models:", err);
        throw err;
    }
}

export default fetchEmployees;