import supabase from "../../config/supabase.js";

const insertContract = async (contract) => {
    try {
        const { error } = await supabase.from("employment_contract").insert({
            id_employer: contract.id_employer,
            id_employee: contract.id_employee,
            function: contract.function,
            daily_hour: contract.daily_hour,
            days_number: contract.days_number,
            clock_in: contract.clock_in,
            clock_out: contract.clock_out,
            break_start: contract.break_start,
            break_end: contract.break_end,
            salary: contract.salary,
            date_start: contract.date_start,
        });

        if(error) return error;
        
    } catch (err) {
        console.error("error in insertContract models:", err);
        throw err;
    }
}

export default insertContract;