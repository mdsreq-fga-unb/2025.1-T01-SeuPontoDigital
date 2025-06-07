import supabase from "../../config/supabase.js";

const postEmployerModel = async (employer) => {
    try {
        const cleanCPF = employer.cpf.replace(/\D/g, '');
        const phoneFormatTwilio = "+55" + employer.phone
        
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