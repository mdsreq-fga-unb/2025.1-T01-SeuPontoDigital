import supabase from "../../config/supabase.js";

function toBrazilDateISO(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));
    return date.toISOString().slice(0, 10);
}

const postContractModel = async (contract) => {
    try {
        const start_date = contract.start_date
            ? toBrazilDateISO(contract.start_date)
            : null;

        const { data:contractID, error } = await supabase.from("contracts").insert({
            function: contract.function,
            salary: contract.salary,
            start_date: start_date,
            end_date: contract.end_date || null,
            access_app: contract.access_app ?? true,
            status: contract.status ?? true
        }).select("id")

        if (error) {
            throw new Error("failed to insert contract");
        }
    }
    catch (err) {
        console.error("error in postContractModel");
    }
}

export default postContractModel;