import supabase from "../../config/supabase.js";

const deleteContractByID = async (id) => {
    try {
        console.log("aaaaaa", id);
        const { error } = await supabase.from("employment_contract").delete().eq("id", id);
        if (error) return error;
    }
    catch (err) {
        console.error("error in deleteContractByID models:", err);
        throw err;
    }
}

export default deleteContractByID;
