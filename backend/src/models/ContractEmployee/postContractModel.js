import supabase from "../../config/supabase.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";

const postContractModel = async (data) => {
    try {
        const cleanCPF = data.cpf.replace(/\D/g, '');

        const passwordHash = await generatePasswordHash(data.password);

        // Formatar telefone para o padrão do Twilio se fornecido
        let phoneFormatTwilio = null;
        if (data.phone) {
            let phone = data.phone.trim();
            
            // Se já tem o prefixo +55, manter como está
            if (phone.startsWith('+55')) {
                phoneFormatTwilio = phone;
            } else {
                // Remover qualquer formatação e garantir que seja apenas números
                phone = phone.replace(/\D/g, '');
                
                // Se começar com 55 e tiver 13 dígitos (55 + 11 dígitos do celular brasileiro)
                // considera que já tem o código do país
                if (phone.startsWith('55') && phone.length === 13) {
                    phoneFormatTwilio = `+${phone}`;
                } else {
                    // Caso contrário, adiciona o +55
                    phoneFormatTwilio = `+55${phone}`;
                }
            }
        }

        let dateNowBrazil = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        let [day, month, year] = dateNowBrazil.split('/');
        dateNowBrazil = `${year}-${month}-${day}`;

        const { error } = await supabase.from("employee_contracts").insert({
            name: data.name,
            cpf: cleanCPF,
            phone: phoneFormatTwilio,
            email: data.email || null,
            password: passwordHash || null,
            employer_id: data.employer_id,
            job_function: data.job_function,
            work_schedule_type: data.work_schedule_type,
            break_type: data.break_type,
            break_interval: data.break_type === "fixed" ? data.break_interval : null,
            break_start: data.break_type === "range" ? data.break_start : null,
            break_end: data.break_type === "range" ? data.break_end : null,
            work_days: data.work_days,
            salary: data.salary,
            contract_status: data.contract_status,
            contract_start_date: dateNowBrazil || null,
            app_access: data.app_access || false,
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