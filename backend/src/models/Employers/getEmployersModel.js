import supabase from "../../config/supabase.js";

const getEmployersModel = async () => {
    try {
        const { data, error } = await supabase.from("employers").select("*")

        if (error) return { error };
            
        return data ;
    }
    catch (err) {
        console.error("error in getEmployersModel");
    }
}

export default getEmployersModel;