import supabase from "../../config/supabase.js";

const postEmployerModel = async (employer) => {
    try {
        const cleanCPF = employer.cpf.replace(/\D/g, '');
        
        // Formatar telefone para o padrão do Twilio
        let phone = employer.phone.trim();
        let phoneFormatTwilio;
        
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
        
        const { error } = await supabase.from("employers").insert({
            name: employer.name,
            cpf: cleanCPF,
            email: employer.email,
            phone: phoneFormatTwilio,
            password: null,
            id_address: employer.id_address,
        });

        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployer model");
    }
}

export default postEmployerModel;