import supabase from "../../config/supabase.js";

const postContractModel = async (contract) => {
    try {
        const { error } = await supabase.from("contracts").insert({
            function: contract.function,
            salary: contract.salary,
            start_date: contract.start_date,
            end_date: contract.end_date || null,
            access_app: contract.access_app || true,
            status: contract.status || true
        })
        if (error) {
            throw new Error("failed to insert contract");
        }
    }
    catch (err) {
        console.error("error in postContractModel");
    }
}

export default postContractModel;