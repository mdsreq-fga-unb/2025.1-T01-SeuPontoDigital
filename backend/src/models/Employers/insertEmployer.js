import supabase from "../../config/supabase.js";

const insertEmployer = async (employer) => {
    try {
        const { error } = await supabase.from("users").insert({
            name: employer.name,
            cpf: employer.cpf,
            email: employer.email,
            phone: employer.phone,
            nacionality: employer.nacionality,
            marital_status: employer.marital_status,
            occupation: employer.occupation,
            rg: employer.rg,
            cep: employer.cep,
            street: employer.street,
            home_number: employer.home_number,
            city: employer.city,
            state: employer.state,
            neighborhood: employer.neighborhood,
            complement: employer.complement || null,
            password: employer.password || null,
            role: 1,
        });
        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployer models:", err);
        throw err;
    }
}

export default insertEmployer;