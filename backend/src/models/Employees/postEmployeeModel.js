import supabase from "../../config/supabase.js";

const postEmployeeModel = async (employee) => {
    try {
        const cleanCPF = employee.cpf.replace(/\D/g, '');
        
        // Formatar telefone para o padrão do Twilio
        let phone = employee.phone.trim();
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
        
        const { error } = await supabase.from("employees").insert({
            name: employee.name,
            cpf: cleanCPF,
            phone: phoneFormatTwilio,
            password: null,
        });

        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployee model");
    }
}

export default postEmployeeModel;