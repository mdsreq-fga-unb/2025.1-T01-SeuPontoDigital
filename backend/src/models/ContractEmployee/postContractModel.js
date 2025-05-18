import supabase from "../../config/supabase.js";

const postContractModel = async (data) => {
    try {
        const cleanCPF = data.cpf.replace(/\D/g, '');
        
        const { error } = await supabase.from("employee_contracts").insert({
            name: data.name,
            cpf: cleanCPF,
            phone: data.phone || null,
            email: data.email || null,
            password: data.password || null,
            employer_id: data.employer_id,
            job_function: data.job_function,
            work_schedule_type: data.work_schedule_type,
            break_interval: data.break_interval,
            work_days: data.work_days,
            salary: data.salary,
            contract_status: data.contract_status,
            contract_start_date: data.contract_start_date,
            contract_end_date: data.contract_end_date || null,
            app_access: data.app_access_status || false,
            workplace_employer: data.workplace_employer,
            workplace_cep: data.cep,
            workplace_street: data.street,
            workplace_home_number: data.home_number,
            workplace_city: data.city,
            workplace_state: data.state,
            workplace_neighborhood: data.neighborhood,
            workplace_complement: data.complement || null,
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