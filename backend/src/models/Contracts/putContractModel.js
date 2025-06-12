import supabase from "../../config/supabase.js";

const putContractModel = async (id, updateContractFields) => {
    try {
        const { error } = await supabase.from("contracts").update(updateContractFields).eq("id", id);

        if (error) return error;
    }
    catch (err) {
        console.error("error in putContractModel");
    }
}

export default putContractModel;