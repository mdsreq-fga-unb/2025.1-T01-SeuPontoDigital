import supabase from "../../config/supabase.js";

const fetchContracts = async () => {
    try {
        const { data, error } = await supabase.from("employment_contract").select("*");
        console.log(data);
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }
    catch (err) {
        console.error("error in fetchContracts models:", err);
        throw err;
    }
}

export default fetchContracts;