import supabase from "../../config/supabase.js";

function toBrazilDateISO(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));
    return date.toISOString().slice(0, 10);
}

const postContractModel = async (contract) => {
    try {
        console.log("Creating contract with data:", contract);
        
        const start_date = contract.start_date
            ? toBrazilDateISO(contract.start_date)
            : null;

        const contractData = {
            function: contract.function || null,
            salary: parseFloat(contract.salary) || 0,
            start_date: start_date,
            end_date: contract.end_date || null,
            access_app: Boolean(contract.access_app),
            status: Boolean(contract.status)
        };

        console.log("Inserting contract data:", contractData);

        const { data: contractID, error } = await supabase.from("contracts").insert(contractData).select("id");

        if (error) {
            console.error("Supabase error:", error);
            throw new Error("failed to insert contract: " + error.message);
        }

        console.log("Contract created successfully:", contractID);
        return contractID[0]?.id;
    }
    catch (err) {
        console.error("error in postContractModel:", err);
        return null;
    }
}

export default postContractModel;