import supabase from "../../config/supabase.js";

function getTodayBrazilISO() {
    const now = new Date();
    now.setUTCHours(now.getUTCHours() - 3);
    return now.toISOString().slice(0, 10);
}

const putContractModel = async (id, updateContractFields) => {
    try {
        if (updateContractFields.status === false) {
            updateContractFields.end_date = getTodayBrazilISO();
        }
        const { error } = await supabase.from("contracts").update(updateContractFields).eq("id", id);

        if (error) return error;
    } 
    catch(err){
        console.error("error in putContractModel");
    }
}

export default putContractModel;