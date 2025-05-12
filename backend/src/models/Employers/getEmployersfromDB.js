import supabase from "../../config/supabase.js";

const getEmployersFromDB = async () => {
    try {
        const { data, error } = await supabase.from("employers").select("*")

        if (error) {
            console.error(error);
            return { error };
        }
        return data ;
    }
    catch (err) {
        console.log("error in getEmployersFromDB models");
    }
}

export default getEmployersFromDB;