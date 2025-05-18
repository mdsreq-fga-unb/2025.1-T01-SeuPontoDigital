import supabase from "../../config/supabase.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";

const postEmployerModel = async (employer) => {
    try {
        const passwordHash = await generatePasswordHash(employer.password);
        const cleanCPF = employer.cpf.replace(/\D/g, '');
        
        const { error } = await supabase.from("employers").insert({
            name: employer.name,
            cpf: cleanCPF,
            email: employer.email,
            phone: employer.phone,
            password: passwordHash || null,
            cep: employer.cep,
            street: employer.street,
            home_number: employer.home_number,
            city: employer.city,
            state: employer.state,
            neighborhood: employer.neighborhood,
            complement: employer.complement || null,
        });
        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployer model");
    }
}

export default postEmployerModel;