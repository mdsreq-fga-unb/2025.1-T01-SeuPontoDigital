import supabase from "../../config/supabase.js";

const postContractModel = async (data) => {
    try {
        const { error } = await supabase.from("employee_contracts").insert({
            name: data.name,
            cpf: data.cpf,
            phone: data.phone || null,
            email: data.email || null,
            password: data.password || null,
            marital_status: data.marital_status,
            nationality: data.nationality,
            work_card_type: data.work_card_type || null,
            work_card_number: data.work_card_number || null,
            work_card_series: data.work_card_series || null,
            work_card_state: data.work_card_state || null,
            work_card_issue_date: data.work_card_issue_date || null,
            employer_id: data.employer_id,
            job_function: data.job_function,
            work_schedule_type: data.work_schedule_type,
            start_time: data.start_time,
            end_time: data.end_time,
            break_interval: data.break_interval,
            rest_time: data.rest_time,
            work_days: data.work_days,
            weekly_hours: data.weekly_hours || null,
            monthly_hours: data.monthly_hours || null,
            salary: data.salary,
            contract_status: data.contract_status,
            contract_start_date: data.contract_start_date,
            contract_end_date: data.contract_end_date || null,
            app_access_status: data.app_access_status
        })
        if (error) {
            throw new Error(error.message);
        }
    }
    catch (err) {
        console.error("error in postContractModel");
        throw err;
    }
}

export default postContractModel;